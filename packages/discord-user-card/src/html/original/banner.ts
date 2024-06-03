import type { DiscordUserCardUser } from "@discord-user-card/core";
import {
	type ClassObject,
	type StyleObject,
	getUserBanner,
	getUserBannerColor,
	parseClassObject,
	parseStyleObject,
} from "../util.js";

export async function renderBanner(user: DiscordUserCardUser) {
	const randomUUID = crypto.randomUUID().slice(0, 8);
	const banner = getUserBanner(user);
	const bannerColor = await getUserBannerColor(user);

	const wrapperStyle: StyleObject = {
		"min-width": "340px",
		"min-height": banner ? "120px" : "60px",
	};
	const classes: ClassObject = {
		duc_banner: true,
		duc_banner_premium: !!banner,
	};
	const style: StyleObject = {
		"background-color": bannerColor,
		...(banner && {
			"background-image": `url('${banner}?size=480')`,
		}),
	};

	return `
			<svg
				class="duc_banner_wrapper"
				viewBox="${user.banner ? "0 0 340 120" : "0 0 340 60"}"
				style="${parseStyleObject(wrapperStyle)}"
			>
				<mask id="mask_avatar_${randomUUID}">
					<rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
					<circle
						fill="black"
						cx="${user.banner ? 58 : 62}"
						cy="${user.banner ? 112 : 56}"
						r="46"
					></circle>
				</mask>
				<foreignObject
					x="0"
					y="0"
					width="100%"
					height="100%"
					overflow="visible"
					mask="url(#mask_avatar_${randomUUID})"
				>
					<div
						class="${parseClassObject(classes)}"
						style="${parseStyleObject(style)}"
					></div>
				</foreignObject>
			</svg>
	`;
}
