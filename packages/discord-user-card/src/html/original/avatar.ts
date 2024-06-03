import type { DiscordUserCardUser } from "@discord-user-card/core";
import { ColorUtils } from "@discord-user-card/core";
import type {
	ClassObject,
} from "../util.js";
import {
	getUserAvatar,
	getUserAvatarDecoration,
	getUserStatus,
	parseClassObject,
} from "../util.js";

export function renderAvatar(user: DiscordUserCardUser) {
	const classes: ClassObject = {
		duc_avatar_wrapper: true,
		duc_avatar_position_premium: !!user.banner,
		duc_avatar_position_normal: !user.banner,
	};
	const avatar = getUserAvatar(user);
	const { status, color: statusColor } = getUserStatus(user);
	let circleColor = "black";
	if (user.themeColors) {
		circleColor
			= ColorUtils.getDarkness(user.themeColors.primary) > 0.5
				? "black"
				: "white";
	}
	return `
		<div class="${parseClassObject(classes)}">
			<div class="duc_avatar_wrapper_inner" role="img" aria-label="timeraa, Online" aria-hidden="false">
				<svg width="92" height="92" viewBox="0 0 92 92" class="duc_avatar_svg" aria-hidden="true">
					<foreignObject x="0" y="0" width="80" height="80" mask="url(#svg-mask-avatar-status-round-80)">
						<div class="duc_avatar_stack">
							<img src="${avatar}?size=80" alt=" " class="duc_avatar" aria-hidden="true">
						</div>
					</foreignObject>
					<circle fill="${circleColor}" r="14" cx="68" cy="68" style="opacity: 0.45;"></circle>
					<rect width="16" height="16" x="60" y="60" fill="${statusColor}" mask="url(#svg-mask-status-${status})"></rect>
				</svg>
				${renderAvatarDecoration(user)}
			</div>
		</div>
	`;
}

function renderAvatarDecoration(user: DiscordUserCardUser) {
	const decoration = getUserAvatarDecoration(user);
	if (!decoration)
		return "";
	return `
		<svg width="108" height="96" viewBox="0 0 108 96" class="duc_avatar_decoration" aria-hidden="true">
			<foreignObject x="0" y="0" width="96" height="96" mask="url(#svg-mask-avatar-decoration-status-round-80)">
				<div class="duc_avatar_stack">
					<img class="duc_avatar" src="${decoration}&amp;size=966" alt=" " aria-hidden="true">
				</div>
			</foreignObject>
		</svg>
	`;
}
