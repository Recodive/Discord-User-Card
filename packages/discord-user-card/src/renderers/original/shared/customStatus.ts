import type {
	DiscordUserCardActivity,
	DiscordUserCardActivityCustom,
	DiscordUserCardProperties,
} from "@discord-user-card/core";
import {
	ActivityType,
	imageToUrl,
	mapDiscordImageHash,
} from "@discord-user-card/core";
import { findEmoji } from "@discord-user-card/emojis";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, removeElement, setClasses } from "../../util.js";

export class CustomStatusRenderer implements Renderer {
	elements = {
		status: document.createElement("div"),
		img: document.createElement("img"),
		text: document.createElement("span"),
	};

	lastProps: Required<DiscordUserCardProperties> | null = null;

	rerender() {
		if (!this.lastProps)
			return;
		this.render(this.lastProps);
	}

	listenersBound = false;
	boundRerender = this.rerender.bind(this);
	reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	constructor(public readonly parent: Element) { }

	private setAttributes(skeleton = false) {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.status, ["class"]);
		clearUnexpectedAttributes(this.elements.img, ["src", "alt", "class"]);
		clearUnexpectedAttributes(this.elements.text, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.status, {
			duc_custom_status: true,
		});
		setClasses(this.elements.img, {
			duc_custom_status_img: true,
		});
		setClasses(this.elements.text, {
			duc_custom_status_text: true,
			duc_skeleton_pill: skeleton,
		});
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		if (!this.listenersBound) {
			window.addEventListener("focus", this.boundRerender);
			window.addEventListener("blur", this.boundRerender);
			this.reduceMotion.addEventListener("change", this.boundRerender);
			this.listenersBound = true;
		}

		this.lastProps = props;
		const { activities } = props;

		const customStatus = findCustomStatus(activities);
		if (!customStatus) {
			return removeElement(this.parent, this.elements.status);
		}

		// ? Set the attributes of the elements
		this.setAttributes();
		if (customStatus.emoji) {
			this.elements.img.src = customStatus.emoji.url;
			this.elements.img.alt = customStatus.emoji.name;
		}

		if (customStatus.state) {
			this.elements.text.textContent = customStatus.state;
		}

		// ? Render the elements
		addElement(this.parent, this.elements.status);
		if (customStatus.emoji) {
			addElement(this.elements.status, this.elements.img);
		}
		else {
			removeElement(this.elements.status, this.elements.img);
		}
		if (customStatus.state) {
			addElement(this.elements.status, this.elements.text);
		}
		else {
			removeElement(this.elements.status, this.elements.text);
		}
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		if (this.listenersBound) {
			window.removeEventListener("focus", this.boundRerender);
			window.removeEventListener("blur", this.boundRerender);
			this.reduceMotion.removeEventListener("change", this.boundRerender);
			this.listenersBound = false;
		}

		this.lastProps = props;
		const { activities } = props;

		const customStatus = findCustomStatus(activities);
		if (!customStatus) {
			return removeElement(this.parent, this.elements.status);
		}

		// ? Set the attributes of the elements
		this.setAttributes(true);

		// ? Render the elements
		addElement(this.parent, this.elements.status);
		addElement(this.elements.status, this.elements.text);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.status);
		window.removeEventListener("focus", this.boundRerender);
		window.removeEventListener("blur", this.boundRerender);
		this.reduceMotion.removeEventListener("change", this.boundRerender);
	}
}

function findCustomStatus(activities: DiscordUserCardActivity[]) {
	const activity = activities.find(
		(activity): activity is DiscordUserCardActivityCustom =>
			activity.type === ActivityType.Custom,
	);
	if (!activity)
		return undefined;

	let emoji:
		| {
			name: string;
			url: string;
		}
		| undefined;
	if (activity.emoji && "hash" in activity.emoji) {
		emoji = {
			name: activity.emoji.name,
			url: imageToUrl({
				scope: "emojis",
				image: mapDiscordImageHash(activity.emoji.hash)!,
				animation: document.hasFocus() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
			}),
		};
	}
	else if (activity.emoji) {
		const foundEmoji = findEmoji(activity.emoji.name);
		if (foundEmoji) {
			emoji = {
				name: foundEmoji.names[0]!,
				url: foundEmoji.asset,
			};
		}
	}

	return {
		emoji,
		state: activity.state,
	};
}
