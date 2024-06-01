import {
	ActivityType,
	DiscordUserCardActivity,
	DiscordUserCardActivityCustom,
	imageToUrl,
} from "@discord-user-card/core";
import { findEmoji } from "@discord-user-card/emojis";

export function renderCustomStatus(activities: DiscordUserCardActivity[]) {
	const customStatus = findCustomStatus(activities);
	if (!customStatus) return "";

	const img = customStatus.emoji
		? `<img class="customStatusImg" src="${customStatus.emoji.url}" alt="${customStatus.emoji.name}"/>`
		: "";
	const span = customStatus.state
		? `<span class="customStatusText">${customStatus.state}</span>`
		: "";

	return `
		<div class="customStatusSection">
			<div class="customStatus">
				${img}
				${span}
			</div>
		</div>
	`;
}

function findCustomStatus(activities: DiscordUserCardActivity[]) {
	const activity = activities.find(
		(activity): activity is DiscordUserCardActivityCustom =>
			activity.type === ActivityType.Custom
	);
	if (!activity) return undefined;

	let emoji:
		| {
				name: string;
				url: string;
		  }
		| undefined;
	if (activity.emoji && "id" in activity.emoji) {
		emoji = {
			name: activity.emoji.name,
			url: imageToUrl({
				scope: "emojis",
				image: activity.emoji,
			}),
		};
	} else if (activity.emoji) {
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
