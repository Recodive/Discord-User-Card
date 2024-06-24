import type {
	DiscordUserCardProperties,
	DiscordUserCardUser,
} from "@discord-user-card/core";
import {
	ColorUtils,
	PresenceUpdateStatus,
	discrimToAvatar,
	getColorFromImage,
	imageToUrl,
} from "@discord-user-card/core";
import type { Renderer } from "../functions/Renderer.js";

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

export function setClasses(element: Element, classObject: ClassObject) {
	const currentClasses = element.getAttribute("class") || "";
	const newClasses = parseClassObject(classObject);
	if (currentClasses === newClasses)
		return;
	element.setAttribute("class", newClasses);
}

export function setStyles(element: Element, styleObject: StyleObject) {
	const currentStyle = element.getAttribute("style") || "";
	const newStyle = parseStyleObject(styleObject);
	if (currentStyle === newStyle)
		return;
	element.setAttribute("style", newStyle);
}

export function clearUnexpectedAttributes(
	element: Element,
	expectedAttributes: string[],
) {
	for (const attribute of Array.from(element.attributes)) {
		if (!expectedAttributes.includes(attribute.name))
			element.removeAttribute(attribute.name);
	}
}

export function addElement(
	parent: Element,
	childToAppend: Element,
) {
	if (parent.contains(childToAppend))
		return;
	parent.appendChild(childToAppend);
}

export function removeElement(
	parent: Element,
	childToRemove: Element,
) {
	if (!parent.contains(childToRemove))
		return;
	parent.removeChild(childToRemove);
}

export async function renderChildren<
		Props = Required<DiscordUserCardProperties>,
	>(children: {
	[key: string]: Renderer<Props> | Element | undefined;
}, props: Props) {
	for (const child of Object.values(children)) {
		if (child && "render" in child)
			await child.render(props);
	}
}

export function destoryChildren(children: {
	[key: string]: Renderer<unknown> | Element | undefined;
}) {
	if (!children)
		return;
	for (const child of Object.values(children)) {
		if (child && "destroy" in child)
			child.destroy();
	}
}

export function getUserAvatar(user: DiscordUserCardUser) {
	if (!user.avatar)
		return discrimToAvatar(user.id, user.discriminator);
	return imageToUrl({
		image: user.avatar,
		scope: "avatars",
		relatedId: user.id,
		animation: document.hasFocus() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	});
}

export function getUserBanner(user: DiscordUserCardUser) {
	if (!user.banner)
		return;
	return imageToUrl({
		image: user.banner,
		scope: "banners",
		relatedId: user.id,
		animation: document.hasFocus() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	});
}

export async function getUserBannerColor(user: DiscordUserCardUser) {
	if (!user.bannerColor)
		return getBackgroundColor(user);
	const [r, g, b] = ColorUtils.intToRgb(user.bannerColor);
	return `rgb(${r}, ${g}, ${b})`;
}

async function getBackgroundColor(user: DiscordUserCardUser) {
	const [dominantColor] = (await getColorFromImage(getUserAvatar(user))) as [
		[number, number, number],
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
	if (status === PresenceUpdateStatus.Idle)
		return { status, color: "#f0b232" };
	if (status === PresenceUpdateStatus.DoNotDisturb)
		return { status, color: "#f23f43" };
	return { status: PresenceUpdateStatus.Offline, color: "#80848e" };
}

export function getUserAvatarDecoration(user: DiscordUserCardUser) {
	if (!user.avatarDecoration)
		return;
	return imageToUrl({
		image: user.avatarDecoration,
		scope: "avatar-decoration-presets",
		relatedId: user.id,
		animation: document.hasFocus() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	});
}
