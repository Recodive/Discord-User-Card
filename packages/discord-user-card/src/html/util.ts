import {
	ColorUtils,
	DiscordUserCardProperties,
	DiscordUserCardUser,
	discrimToAvatar,
	getColorFromImage,
	imageToUrl,
	PresenceUpdateStatus,
} from "@discord-user-card/core";

export type RenderFunction = {
	render: (props: DiscordUserCardProperties) => Promise<void>;
};

export type ClassObject = Record<string, boolean>;
export function parseClassObject(classObject: ClassObject): string {
	return Object.entries(classObject)
		.filter(([, value]) => value)
		.map(([key]) => key)
		.join(" ");
}

export type StyleObject = Record<string, string | number | undefined>;
export function parseStyleObject(styleObject: StyleObject): string {
	return Object.entries(styleObject)
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => `${key}: ${value};`)
		.join(" ");
}

export function getUserAvatar(user: DiscordUserCardUser) {
	if (!user.avatar) return discrimToAvatar(user.id, user.discriminator);
	return imageToUrl({
		image: user.avatar,
		scope: "avatars",
		relatedId: user.id,
	});
}

export function getUserBanner(user: DiscordUserCardUser) {
	if (!user.banner) return;
	return imageToUrl({
		image: user.banner,
		scope: "banners",
		relatedId: user.id,
	});
}

export async function getUserBannerColor(user: DiscordUserCardUser) {
	if (!user.bannerColor) return getBackgroundColor(user);
	const [r, g, b] = ColorUtils.intToRgb(user.bannerColor);
	return `rgb(${r}, ${g}, ${b})`;
}

async function getBackgroundColor(user: DiscordUserCardUser) {
	const [dominantColor] = (await getColorFromImage(getUserAvatar(user))) as [
		[number, number, number]
	];
	return `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
}

export function getUserStatus(user: DiscordUserCardUser): {
	status: string;
	color: string;
} {
	const { status } = user;
	if (status === PresenceUpdateStatus.Online)
		return { status, color: "#23a55a" };
	if (status === PresenceUpdateStatus.Idle) return { status, color: "#f0b232" };
	if (status === PresenceUpdateStatus.DoNotDisturb)
		return { status, color: "#f23f43" };
	return { status: PresenceUpdateStatus.Offline, color: "#80848e" };
}

export function getUserAvatarDecoration(user: DiscordUserCardUser) {
	if (!user.avatarDecoration) return;
	return imageToUrl({
		image: user.avatarDecoration,
		scope: "avatar-decoration-presets",
		relatedId: user.id,
	});
}
