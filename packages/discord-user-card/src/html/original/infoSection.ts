import type {
	DiscordUserCardActivity,
	DiscordUserCardUser,
} from "@discord-user-card/core";
import {
	userIdToTimestamp,
} from "@discord-user-card/core";
import { renderUsername } from "./username.js";
import { renderCustomStatus } from "./customStatus.js";
import { renderActivities } from "./activities.js";
import { renderMarkdown } from "./markdown.js";

export function renderInfoSection(
	user: DiscordUserCardUser,
	activities: DiscordUserCardActivity[],
	rerenderIn: (ms: number) => void,
) {
	return `
		<div class="duc_user_section">
			<!-- Needed? -->
			<span></span>
			${renderUsername(user)}
			${renderCustomStatus(activities)}
			<div class="duc_divider"></div>
			<div class="duc_scroller">
				${renderAboutMe(user, rerenderIn)}
				${renderMemberSince(user)}
				${renderActivities(activities, rerenderIn)}
			</div>
		</div>
	`;
}

function renderAboutMe(user: DiscordUserCardUser, rerenderIn: (ms: number) => void) {
	if (!user.bio)
		return "";

	const [bioHTML, rerenderInterval] = renderMarkdown(user.bio, "duc_section_text");
	if (rerenderInterval)
		rerenderIn(rerenderInterval);

	return `
		<div class="duc_section">
			<h2 class="duc_section_title">About Me</h2>
			${bioHTML}
		</div>
	`;
}

function renderMemberSince(user: DiscordUserCardUser) {
	const timestamp = userIdToTimestamp(user.id);
	const formatter = new Intl.DateTimeFormat(
		navigator.language || "en",
		// Sep 8, 2021
		{ month: "short", day: "numeric", year: "numeric" },
	);
	const memberSince = formatter.format(new Date(timestamp));

	return `
		<div class="duc_section">
			<h2 class="duc_section_title">Member Since</h2>
			<div class="duc_section_text">${memberSince}</div>
		</div>
	`;
}
