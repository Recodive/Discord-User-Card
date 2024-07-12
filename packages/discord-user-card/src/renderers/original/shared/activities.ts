import {
	ActivityType,
	type DiscordUserCardActivityCompeting,
	type DiscordUserCardActivityHang,
	type DiscordUserCardActivityListening,
	type DiscordUserCardActivityPlaying,
	type DiscordUserCardActivityStreaming,
	type DiscordUserCardActivityWatching,
	formatTimestamp,
	imageToUrl,
} from "@discord-user-card/core";
import { findEmoji } from "@discord-user-card/emojis";
import type { Renderer } from "../../../functions/Renderer.js";
import {
	addElement,
	clearUnexpectedAttributes,
	destoryChildren,
	isUrl,
	removeElement,
	renderChildren,
	setClasses,
	setStyles,
} from "../../util.js";

const appIconCache = new Map<string, string>();

export interface Activity {
	activity:
		| DiscordUserCardActivityPlaying
		| DiscordUserCardActivityStreaming
		| DiscordUserCardActivityListening
		| DiscordUserCardActivityWatching
		| DiscordUserCardActivityCompeting
		| DiscordUserCardActivityHang;
	title: string;
	line1: string | undefined;
	line2: string | undefined;
	line3: string | undefined;
};

export function mapActivity(activity: DiscordUserCardActivityPlaying | DiscordUserCardActivityStreaming | DiscordUserCardActivityListening | DiscordUserCardActivityWatching | DiscordUserCardActivityCompeting | DiscordUserCardActivityHang): Activity | undefined {
	let title = "";
	let line1: string | undefined;
	let line2: string | undefined;
	let line3: string | undefined;
	switch (activity.type) {
		case ActivityType.Playing: {
			title = "Playing a game";
			line1 = activity.name;
			line2 = activity.details;
			line3 = activity.state;
			break;
		}
		case ActivityType.Streaming: {
			title = `Live on ${activity.name}`;
			line1 = activity.details;
			line2 = activity.state;
			line3 = activity.largeImageText;
			break;
		}
		case ActivityType.Listening: {
			const isSpotify = activity.name === "Spotify" && activity.largeImage?.startsWith("spotify:");
			title = `Listening to ${activity.name}`;
			line1 = activity.details;
			line2 = `${isSpotify ? "by " : ""}${activity.state}`;
			line3 = `${isSpotify ? "on " : ""}${activity.largeImageText}`;
			break;
		}
		case ActivityType.Watching: {
			title = `Watching ${activity.name}`;
			line1 = activity.details;
			line2 = activity.state;
			line3 = activity.largeImageText;
			break;
		}
		case ActivityType.Competing: {
			title = `Competing in ${activity.name}`;
			line1 = activity.details;
			line2 = activity.state;
			line3 = activity.largeImageText;
			break;
		}
		case ActivityType.Hang: {
			title = "Right now, I'm -";
			line1 = {
				"eating": "Grubbin",
				"gaming": "GAMING",
				"chilling": "Chilling",
				"focusing": "In the zone",
				"brb": "Gonna BRB",
				"in-transit": "Wandering IRL",
				"watching": "Watchin' stuff",
				"custom": activity.details,
			}[activity.state];
			line2 = "in a Voice Channel";
			break;
		}
		default:
			return;
	}
	return { activity, title, line1, line2, line3 };
}

export class ActivityContentRenderer implements Renderer<Activity> {
	elements = {
		imageContainer: document.createElement("div"),
		largeImage: document.createElement("img"),
		smallImage: document.createElement("img"),
		details: document.createElement("div"),
		line1: document.createElement("div"),
		line2: document.createElement("div"),
		line3: document.createElement("div"),
	};

	children = {
		elapsedLeftLine: new ElapsedLeftLineRenderer(this.elements.details),
	};

	lastProps: Activity | null = null;

	rerender() {
		if (!this.lastProps)
			return;
		this.render(this.lastProps);
	}

	boundRerender = this.rerender.bind(this);
	prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	constructor(public readonly parent: Element) {
		window.addEventListener("focus", this.boundRerender);
		window.addEventListener("blur", this.boundRerender);
		this.prefersReducedMotion.addEventListener("change", this.boundRerender);
	}

	async render(props: Activity): Promise<void> {
		this.lastProps = props;
		const { activity, line1, line2, line3 } = props;
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.imageContainer, ["class"]);
		clearUnexpectedAttributes(this.elements.largeImage, ["class", "src", "alt"]);
		clearUnexpectedAttributes(this.elements.smallImage, ["class", "src", "alt"]);
		clearUnexpectedAttributes(this.elements.details, ["class"]);
		clearUnexpectedAttributes(this.elements.line1, ["class"]);
		clearUnexpectedAttributes(this.elements.line2, ["class"]);
		clearUnexpectedAttributes(this.elements.line3, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.imageContainer, {
			duc_activity_image: true,
		});
		setClasses(this.elements.largeImage, {
			duc_activity_image_large: true,
			duc_activity_image_hang: activity.type === ActivityType.Hang || "emoji" in activity,
			duc_spotify_image: activity.type !== ActivityType.Hang && activity.name === "Spotify" && !!activity.largeImage?.startsWith("spotify:"),
			duc_activity_image_app_icon: activity.type !== ActivityType.Hang && !("largeImage" in activity) && !!activity.applicationId,
			duc_has_small_image: activity.type !== ActivityType.Hang && !!activity.smallImage,
		});
		setClasses(this.elements.smallImage, {
			duc_activity_image_small: true,
		});
		setClasses(this.elements.details, {
			duc_activity_details: true,
		});
		setClasses(this.elements.line1, {
			duc_activity_details_line: true,
		});
		setClasses(this.elements.line2, {
			duc_activity_details_line: true,
		});
		setClasses(this.elements.line3, {
			duc_activity_details_line: true,
		});

		// ? Render the elements
		const renderLargeImage = await this.setLargeImage(props);
		if (!renderLargeImage) {
			removeElement(this.parent, this.elements.imageContainer);
		}
		else {
			addElement(this.parent, this.elements.imageContainer);
			addElement(this.elements.imageContainer, this.elements.largeImage);

			const renderSmallImage = this.setSmallImage(props);
			if (renderSmallImage) {
				addElement(this.elements.imageContainer, this.elements.smallImage);
			}
			else {
				removeElement(this.elements.imageContainer, this.elements.smallImage);
			}
		}

		addElement(this.parent, this.elements.details);
		if (line1) {
			this.elements.line1.textContent = line1;
			addElement(this.elements.details, this.elements.line1);
		}
		if (line2) {
			this.elements.line2.textContent = line2;
			addElement(this.elements.details, this.elements.line2);
		}
		if (line3) {
			this.elements.line3.textContent = line3;
			addElement(this.elements.details, this.elements.line3);
		}

		await renderChildren(this.children, props);
	}

	async setLargeImage({ activity }: Activity): Promise<boolean> {
		// ? If the activity has an emoji, render the emoji
		if ("emoji" in activity && activity.emoji) {
			let emoji: {
				name: string;
				url: string;
			} | undefined;

			// ? If the emoji is a custom emoji, get the emoji from the API using the ID
			if ("id" in activity.emoji) {
				emoji = {
					name: activity.emoji.name,
					url: imageToUrl({
						scope: "emojis",
						image: activity.emoji,
						animation: document.hasFocus() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
					}),
				};
			}
			else {
				// ? If the emoji is a default emoji, get the emoji from the default emojis
				const foundEmoji = findEmoji(activity.emoji.name);
				if (foundEmoji) {
					emoji = {
						name: foundEmoji.names[0]!,
						url: foundEmoji.asset,
					};
				}
			}

			// ? If the emoji does not exist, return
			if (!emoji)
				return false;

			// ? Set the source and alt of the image
			this.elements.largeImage.src = emoji.url;
			this.elements.largeImage.alt = emoji.name;
			return true;
		}

		// ? If the activity is a hang activity, render the hang activity image
		if (activity.type === ActivityType.Hang) {
			this.elements.largeImage.src = `https://cdn.rcd.gg/discord/hang/${activity.state}.svg`;
			this.elements.largeImage.alt = activity.state;
			return true;
		}

		// ? If the activity does not have a large image, return
		if (!("largeImage" in activity) || !activity.largeImage) {
			// ? If the activity does not have an application ID, return
			if (!("applicationId" in activity) || !activity.applicationId)
				return false;

			// ? Fetch the appIcon hash from the API
			const appIcon = await this.getAppIcon(activity.applicationId);
			if (!appIcon)
				return false;

			// ? Set the source of the image to the application icon
			this.elements.largeImage.src = imageToUrl({
				scope: "app-icons",
				image: {
					id: appIcon,
					animated: false,
				},
				relatedId: activity.applicationId,
			});
			this.elements.largeImage.alt = "";
			return true;
		}

		// ? Get the source of the large image
		const largeImageSrc = this.getAsset(activity.largeImage, activity.applicationId);

		// ? Set the source of the image
		this.elements.largeImage.src = largeImageSrc;
		this.elements.largeImage.alt = activity.largeImageText ?? "";

		return true;
	}

	setSmallImage({ activity }: Activity): boolean {
		if (activity.type === ActivityType.Hang || !activity.smallImage)
			return false;

		const smallImageSrc = this.getAsset(activity.smallImage, activity.applicationId);

		this.elements.smallImage.src = smallImageSrc;
		this.elements.smallImage.alt = activity.smallImageText ?? "";

		return true;
	}

	async getAppIcon(applicationId: string): Promise<string | undefined> {
		if (appIconCache.has(applicationId))
			return appIconCache.get(applicationId)!;

		const response = await fetch(`https://discord.com/api/v9/applications/${applicationId}/rpc`);
		if (!response.ok)
			return;

		const asset = await response.json();
		if (!asset.icon)
			return;

		appIconCache.set(applicationId, asset.icon);
		return asset.icon;
	}

	getAsset(asset: string, relatedId?: string) {
		if (asset.startsWith("mp:external"))
			return `https://media.discordapp.net/${asset.replace("mp:", "")}`;

		if (asset.startsWith("spotify:"))
			return `https://i.scdn.co/image/${asset.replace("spotify:", "")}`;

		if (isUrl(asset))
			return asset;

		const animated = asset.startsWith("a_");

		return imageToUrl({
			image: {
				animated,
				id: animated ? asset.slice(2) : asset,
			},
			scope: "app-assets",
			relatedId,
			animation: document.hasFocus() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
		});
	}

	destroy(): void {
		removeElement(this.parent, this.elements.imageContainer);
		window.removeEventListener("focus", this.boundRerender);
		window.removeEventListener("blur", this.boundRerender);
		this.prefersReducedMotion.removeEventListener("change", this.boundRerender);
		destoryChildren(this.children);
	}
}

class ElapsedLeftLineRenderer implements Renderer<Activity> {
	elements = {
		line: document.createElement("div"),
	};

	timeout: NodeJS.Timeout | null = null;

	constructor(public readonly parent: Element) {
	}

	async render(props: Activity): Promise<void> {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		const { activity } = props;
		// ? If the activity does not have a start or end timestamp, or has both, return
		if (((!("startTimestamp" in activity) || !activity.startTimestamp) && (!("endTimestamp" in activity) || !activity.endTimestamp)) || (activity.startTimestamp && activity.endTimestamp)) {
			return removeElement(this.parent, this.elements.line);
		}

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.line, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.line, {
			duc_activity_details_line: true,
		});

		// ? Get the content of the line
		let content: string;
		const now = Date.now();

		if (activity.startTimestamp) {
			let start = activity.startTimestamp;
			if (now <= start)
				start = now;
			const elapsed = new Date(now - start);

			// ? If the activity has no largeImage set render relative time
			if (!("largeImage" in activity) || !activity.largeImage) {
				const [relativeTime, timeoutTime] = formatTimestamp(start, "R", "en");
				if (timeoutTime) {
					this.timeout = setTimeout(() => {
						this.render(props);
					}, timeoutTime);
				}

				content = `for ${relativeTime.replace("ago", "")}`;
			}
			else {
				if (+elapsed > 0) {
					this.timeout = setTimeout(() => {
						this.render(props);
					}, 1000);
				}

				content = `${formatDate(elapsed)} elapsed`;
			}
		}
		else {
			const end = Math.max(activity.endTimestamp!, now);
			const left = new Date(end - now);
			if (+left > 0) {
				this.timeout = setTimeout(() => {
					this.render(props);
				}, 1000);
			}
			content = `${formatDate(left)} left`;
		}

		// ? Render the elements
		this.elements.line.textContent = content;
		addElement(this.parent, this.elements.line);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.line);
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
	}
}

export class TimebarRenderer implements Renderer<Activity> {
	elements = {
		container: document.createElement("div"),
		timebar: document.createElement("div"),
		fill: document.createElement("div"),
		time: document.createElement("div"),
		timeLeft: document.createElement("div"),
		timeRight: document.createElement("div"),
	};

	timeout: NodeJS.Timeout | null = null;

	constructor(public readonly parent: Element) {
	}

	async render(props: Activity): Promise<void> {
		const { activity } = props;
		if (!("startTimestamp" in activity) || !activity.startTimestamp || !("endTimestamp" in activity) || !activity.endTimestamp)
			return removeElement(this.parent, this.elements.container);

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.container, ["class"]);
		clearUnexpectedAttributes(this.elements.timebar, ["class"]);
		clearUnexpectedAttributes(this.elements.fill, ["class", "style"]);
		clearUnexpectedAttributes(this.elements.time, ["class"]);
		clearUnexpectedAttributes(this.elements.timeLeft, ["class"]);
		clearUnexpectedAttributes(this.elements.timeRight, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.container, {
			duc_activity_timebar_container: true,
		});
		setClasses(this.elements.timebar, {
			duc_activity_timebar: true,
		});
		setClasses(this.elements.fill, {
			duc_activity_timebar_fill: true,
		});
		setClasses(this.elements.time, {
			duc_activity_timebar_time: true,
		});
		setClasses(this.elements.timeLeft, {
			duc_activity_timebar_time_left: true,
		});
		setClasses(this.elements.timeRight, {
			duc_activity_timebar_time_right: true,
		});

		// ? Get the time elapsed, end left and the percentage
		const now = Date.now();
		let start = activity.startTimestamp;
		const end = activity.endTimestamp;
		if (now <= start)
			start = now;
		const elapsed = new Date(now - start);
		const endTime = new Date(end - start);
		const percentage = Math.min(((elapsed.getTime() / endTime.getTime()) * 10000) / 100, 100);

		// ? If the time has not ended, rerender in 1 second
		if (+elapsed < +endTime) {
			this.timeout = setTimeout(() => {
				this.render(props);
			}, 1000);
		}

		// ? Render the elements
		addElement(this.parent, this.elements.container);
		addElement(this.elements.container, this.elements.timebar);
		setStyles(this.elements.fill, {
			width: `${percentage}%`,
		});
		addElement(this.elements.timebar, this.elements.fill);
		addElement(this.elements.container, this.elements.time);
		this.elements.timeLeft.textContent = `${formatDate(elapsed, 1)}`;
		addElement(this.elements.time, this.elements.timeLeft);
		this.elements.timeRight.textContent = `${formatDate(endTime, 1)}`;
		addElement(this.elements.time, this.elements.timeRight);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.container);
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
	}
}

function formatDate(date: Date, padMinutes = 2) {
	const hours = date.getUTCHours() ? `${date.getUTCHours().toString().padStart(2, "0")}:` : "";
	return `${hours}${date.getUTCMinutes().toString().padStart(padMinutes, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}`;
}

export class ButtonsRenderer implements Renderer<Activity> {
	elements = {
		buttons: document.createElement("div"),
		one: document.createElement("a"),
		oneLabel: document.createElement("div"),
		two: document.createElement("a"),
		twoLabel: document.createElement("div"),
	};

	constructor(public readonly parent: Element) {}

	async render({ activity }: Activity): Promise<void> {
		if (!("buttons" in activity) || !activity.buttons?.length)
			return removeElement(this.parent, this.elements.buttons);

		const [button1, button2] = activity.buttons;

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.buttons, ["class"]);
		clearUnexpectedAttributes(this.elements.one, ["class", "href", "target"]);
		clearUnexpectedAttributes(this.elements.oneLabel, ["class"]);
		clearUnexpectedAttributes(this.elements.two, ["class", "href", "target"]);
		clearUnexpectedAttributes(this.elements.twoLabel, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.buttons, {
			duc_activity_buttons: true,
		});
		setClasses(this.elements.one, {
			duc_activity_button: true,
		});
		setClasses(this.elements.oneLabel, {
			duc_activity_button_label: true,
		});
		setClasses(this.elements.two, {
			duc_activity_button: true,
		});
		setClasses(this.elements.twoLabel, {
			duc_activity_button_label: true,
		});

		// ? Set the attributes of the elements and render the elements
		addElement(this.parent, this.elements.buttons);

		this.elements.one.href = button1.url;
		this.elements.one.target = "_blank";
		this.elements.oneLabel.textContent = button1.label;
		addElement(this.elements.buttons, this.elements.one);
		addElement(this.elements.one, this.elements.oneLabel);

		if (button2) {
			this.elements.two.href = button2.url;
			this.elements.two.target = "_blank";
			this.elements.twoLabel.textContent = button2.label;
			addElement(this.elements.buttons, this.elements.two);
			addElement(this.elements.two, this.elements.twoLabel);
		}
		else {
			removeElement(this.elements.buttons, this.elements.two);
		}
	}

	destroy(): void {
		removeElement(this.parent, this.elements.buttons);
	}
}
