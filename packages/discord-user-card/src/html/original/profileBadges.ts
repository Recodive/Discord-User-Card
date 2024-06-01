import {
	badgeToUrl,
	DiscordUserCardUser,
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

const renderProfileBadge = (badge: string) =>
	`<img class="duc_profile_badge" src="${badge}" alt=" " />`;
