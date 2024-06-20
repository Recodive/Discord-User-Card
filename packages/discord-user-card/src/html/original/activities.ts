import { ActivityType, type DiscordUserCardActivity, type DiscordUserCardActivityButton, imageToUrl } from "@discord-user-card/core";
import { findEmoji } from "@discord-user-card/emojis";

export function renderActivities(
	activities: DiscordUserCardActivity[],
	rerenderIn: (ms: number) => void,
) {
	const validActivities = activities.filter(activity => activity.type !== ActivityType.Custom);
	if (validActivities.length === 0)
		return "";
	const activity = validActivities[0]!;

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
			return "";
	}

	return `
		<div class="duc_section duc_activity">
			<div class="duc_activity_header_container">
				<h2 class="duc_section_title duc_activity_header">${title}</h2>
			</div>
			<div class="duc_activity_content">
				${renderImages(activity)}
				<div class="duc_activity_details">
					${line1 ? `<div class="duc_activity_details_line">${line1}</div>` : ""}
					${line2 ? `<div class="duc_activity_details_line">${line2}</div>` : ""}
					${line3 ? `<div class="duc_activity_details_line">${line3}</div>` : ""}
					${renderElapsedOrLeft(activity, rerenderIn)}
				</div>
			</div>
			${renderTimebar(activity, rerenderIn)}
			${renderButtons(activity)}
			</div>
		</div>
	`;
}

function renderImages(activity: DiscordUserCardActivity) {
	if ("emoji" in activity && activity.emoji) {
		let emoji: {
			name: string;
			url: string;
		} | undefined;
		if ("id" in activity.emoji) {
			emoji = {
				name: activity.emoji.name,
				url: imageToUrl({
					scope: "emojis",
					image: activity.emoji,
					animation: document.hasFocus(),
				}),
			};
		}
		else {
			const foundEmoji = findEmoji(activity.emoji.name);
			if (foundEmoji) {
				emoji = {
					name: foundEmoji.names[0]!,
					url: foundEmoji.asset,
				};
			}
		}

		if (!emoji)
			return "";

		return `
		<div class="duc_activity_image">
			<img class="duc_activity_image_hang" src="${emoji.url}" alt="${emoji.name}">
		</div>`;
	}

	if (activity.type === ActivityType.Hang) {
		return `
		<div class="duc_activity_image">
			<img class="duc_activity_image_hang" src="https://cdn.rcd.gg/discord/hang/${activity.state}.svg" alt="${activity.state}">
		</div>`;
	}

	if (!("largeImage" in activity) || !activity.largeImage) {
		if (!("applicationId" in activity) || !activity.applicationId)
			return "";

		return `
			<div class="duc_activity_image">
				<img class="duc_activity_image_large" src="${imageToUrl({
					scope: "app-icons",
					image: {
						id: activity.applicationId,
						animated: false,
					},
				})}" alt="">
			</div>
		`;
	}

	const largeImageSrc = getAsset(activity.largeImage, activity.applicationId);
	const smallImageSrc = activity.smallImage ? getAsset(activity.smallImage, activity.applicationId) : "";

	const smallImage = smallImageSrc ? `<img class="duc_activity_image_small" src="${smallImageSrc}" alt="${activity.smallImageText ?? ""}">` : "";

	const isSpotify = activity.name === "Spotify" && activity.largeImage?.startsWith("spotify:");

	return `
		<div class="duc_activity_image">
			<img class="duc_activity_image_large${isSpotify ? " duc_spotify_image" : ""}${smallImage ? " duc_has_small_image" : ""}" src="${largeImageSrc}" alt="${activity.largeImageText ?? ""}">
			${smallImage}
		</div>
	`;
}

function getAsset(asset: string, relatedId?: string) {
	if (asset.startsWith("mp:external"))
		return `https://media.discordapp.net/${asset.replace("mp:", "")}`;

	if (asset.startsWith("spotify:"))
		return `https://i.scdn.co/image/${asset.replace("spotify:", "")}`;

	const animated = asset.startsWith("a_");

	return imageToUrl({
		image: {
			animated,
			id: animated ? asset.slice(2) : asset,
		},
		scope: "app-assets",
		relatedId,
		animation: document.hasFocus(),
	});
}

function renderTimebar(activity: DiscordUserCardActivity, rerenderIn: (ms: number) => void) {
	if (!("startTimestamp" in activity) || !activity.startTimestamp || !("endTimestamp" in activity) || !activity.endTimestamp)
		return "";

	const now = Date.now();
	let start = activity.startTimestamp;
	const end = activity.endTimestamp;
	if (now <= start)
		start = now;
	const elapsedTime = new Date(now - start);
	const endTime = new Date(end - start);
	const percentage = Math.min(((elapsedTime.getTime() / endTime.getTime()) * 10000) / 100, 100);

	if (+elapsedTime < +endTime)
		rerenderIn(1000);

	return `
		<div class="duc_activity_timebar_container">
			<div class="duc_activity_timebar">
				<div class="duc_activity_timebar_fill" style="width: ${percentage}%"></div>
			</div>
			<div class="duc_activity_timebar_time">
				<div class="duc_activity_timebar_time_left">${formatDate(elapsedTime, 1)}</div>
				<div class="duc_activity_timebar_time_right">${formatDate(endTime, 1)}</div>
			</div>
		</div>
	`;
}

function formatDate(date: Date, padMinutes = 2) {
	const hours = date.getUTCHours() ? `${date.getUTCHours().toString().padStart(2, "0")}:` : "";
	return `${hours}${date.getUTCMinutes().toString().padStart(padMinutes, "0")}:${date.getUTCSeconds().toString().padStart(2, "0")}`;
}

function renderElapsedOrLeft(activity: DiscordUserCardActivity, rerenderIn: (ms: number) => void) {
	if ((!("startTimestamp" in activity) || !activity.startTimestamp) && (!("endTimestamp" in activity) || !activity.endTimestamp))
		return "";
	if (activity.startTimestamp && activity.endTimestamp)
		return "";

	const now = Date.now();

	if (activity.startTimestamp) {
		let start = activity.startTimestamp;
		if (now <= start)
			start = now;
		const elapsed = new Date(now - start);
		if (+elapsed > 0)
			rerenderIn(1000);
		return `<div class="duc_activity_details_line">${formatDate(elapsed)} elapsed</div>`;
	}
	else {
		const end = Math.max(activity.endTimestamp!, now);
		const left = new Date(end - now);
		if (+left > 0)
			rerenderIn(1000);
		return `<div class="duc_activity_details_line">${formatDate(left)} left</div>`;
	}
}

function renderButtons(activity: DiscordUserCardActivity) {
	if (!("buttons" in activity) || !activity.buttons?.length)
		return "";

	const [button1, button2] = activity.buttons;

	return `
		<div class="duc_activity_buttons">
			${renderButton(button1)}
			${button2 ? renderButton(button2) : ""}
		</div>
	`;
}

function renderButton(button: DiscordUserCardActivityButton) {
	return `
		<a class="duc_activity_button" href="${button.url}" target="_blank">
			<div class="duc_activity_button_label">${button.label}</div>
		</a>
	`;
}
