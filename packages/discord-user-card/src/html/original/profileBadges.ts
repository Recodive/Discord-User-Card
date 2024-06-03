import type {
	DiscordUserCardUser,
} from "@discord-user-card/core";
import {
	badgeToUrl,
	orderBadges,
} from "@discord-user-card/core";

export function renderProfileBadges(user: DiscordUserCardUser) {
	const badges = orderBadges(user.badges || []).map(badgeToUrl);
	return `
		<div class="duc_profile_badges">
			${badges.map(renderProfileBadge).join("")}
		</div>
	`;
}

function renderProfileBadge(badge: string) {
	return `<img class="duc_profile_badge" src="${badge}" alt=" " />`;
}
