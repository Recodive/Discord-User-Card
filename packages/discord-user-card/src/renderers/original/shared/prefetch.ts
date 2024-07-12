import type {
	DiscordUserCardProperties,
} from "@discord-user-card/core";
import {
	imageToUrl,
	mapDiscordImageHash,
} from "@discord-user-card/core";
import type { SingleASTNode } from "@discord-user-card/markdown";
import { parseMarkdown } from "@discord-user-card/markdown";
import { AnimationType, findProfileEffect } from "@discord-user-card/profile-effects";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, isUrl, removeElement } from "../../util.js";

export class PrefetchRenderer implements Renderer {
	elements: HTMLLinkElement[] = [];

	constructor(public readonly parent: Element, private readonly style: "card" | "profile") { }

	async render({ user, activities }: Required<DiscordUserCardProperties>): Promise<void> {
		const linksToPrefetch = new Set<string>();
		if (user.avatar && !isUrl(user.avatar) && user.avatar.startsWith("a_")) {
			const image = mapDiscordImageHash(user.avatar)!;
			const [avatarUrlAnimated, avatarUrlStatic] = [
				imageToUrl({
					image,
					relatedId: user.id,
					animation: true,
					scope: "avatars",
				}),
				imageToUrl({
					image,
					relatedId: user.id,
					animation: false,
					scope: "avatars",
				}),
			];
			linksToPrefetch.add(`${avatarUrlAnimated}?size=${this.style === "card" ? "80" : "128"}`);
			linksToPrefetch.add(`${avatarUrlStatic}?size=${this.style === "card" ? "80" : "128"}`);
		}

		if (user.avatarDecoration?.startsWith("a_")) {
			const image = mapDiscordImageHash(user.avatarDecoration)!;
			const [decorationUrlAnimated, decorationUrlStatic] = [
				imageToUrl({
					image,
					relatedId: user.id,
					animation: true,
					scope: "avatar-decoration-presets",
				}),
				imageToUrl({
					image,
					relatedId: user.id,
					animation: false,
					scope: "avatar-decoration-presets",
				}),
			];
			linksToPrefetch.add(`${decorationUrlAnimated}&size=${this.style === "card" ? "96" : "160"}`);
			linksToPrefetch.add(`${decorationUrlStatic}&size=${this.style === "card" ? "96" : "160"}`);
		}

		if (user.banner && !isUrl(user.banner) && user.banner.startsWith("a_")) {
			const image = mapDiscordImageHash(user.banner)!;
			const [bannerUrlAnimated, bannerUrlStatic] = [
				imageToUrl({
					image,
					relatedId: user.id,
					animation: true,
					scope: "banners",
				}),
				imageToUrl({
					image,
					relatedId: user.id,
					animation: false,
					scope: "banners",
				}),
			];
			linksToPrefetch.add(`${bannerUrlAnimated}?size=480`);
			linksToPrefetch.add(`${bannerUrlStatic}?size=480`);
		}

		if (user.bio) {
			const bio = parseMarkdown(user.bio);
			function getAnimatedEmojisFromMarkdown(markdown: SingleASTNode[]) {
				for (const node of markdown) {
					if (node.type === "emoji" && node.animated) {
						const [animatedUrl, staticUrl] = [
							imageToUrl({
								image: {
									animated: node.animated,
									id: node.id,
								},
								animation: true,
								scope: "emojis",
							}),
							imageToUrl({
								image: {
									animated: node.animated,
									id: node.id,
								},
								animation: false,
								scope: "emojis",
							}),
						];
						linksToPrefetch.add(animatedUrl);
						linksToPrefetch.add(staticUrl);
						continue;
					}

					if ("content" in node && Array.isArray(node.content)) {
						getAnimatedEmojisFromMarkdown(node.content);
					}
				}
			}
			getAnimatedEmojisFromMarkdown(bio);
		}

		if (user.profileEffect) {
			const profileEffect = findProfileEffect(user.profileEffect);
			if (profileEffect && profileEffect.animationType !== AnimationType.UNSPECIFIED) {
				linksToPrefetch.add(profileEffect.reducedMotionSrc);
				if (profileEffect.animationType === AnimationType.PERSISTENT) {
					linksToPrefetch.add(profileEffect.staticFrameSrc);
				}
				for (const effect of profileEffect.effects) {
					linksToPrefetch.add(effect.src);
				}
			}
		}

		if (activities.length) {
			for (const activity of activities) {
				if ("emoji" in activity && activity.emoji && "hash" in activity.emoji && activity.emoji.hash.startsWith("a_")) {
					const image = mapDiscordImageHash(activity.emoji.hash)!;
					const [animatedUrl, staticUrl] = [
						imageToUrl({
							image,
							animation: true,
							scope: "emojis",
						}),
						imageToUrl({
							image,
							animation: false,
							scope: "emojis",
						}),
					];
					linksToPrefetch.add(animatedUrl);
					linksToPrefetch.add(staticUrl);
				}
			}
		}

		const allLinks = Array.from(linksToPrefetch);
		// ? Create the correct amount of link elements
		if (this.elements.length < allLinks.length) {
			for (let i = this.elements.length; i < allLinks.length; i++) {
				this.elements.push(document.createElement("link"));
			}
		}
		else if (this.elements.length > allLinks.length) {
			for (let i = this.elements.length; i > allLinks.length; i--) {
				const linkElement = this.elements.pop()!;
				removeElement(this.parent, linkElement);
				linkElement.remove();
			}
		}

		// ? Set the attributes of the link elements
		for (let i = 0; i < allLinks.length; i++) {
			const linkElement = this.elements[i]!;
			clearUnexpectedAttributes(linkElement, ["rel", "href"]);
			linkElement.setAttribute("rel", "prefetch");
			linkElement.setAttribute("href", allLinks[i]!);
		}

		// ? Append the elements to the parent element
		for (const linkElement of this.elements)
			addElement(this.parent, linkElement);
	}

	destroy(): void {
		for (const linkElement of this.elements) {
			removeElement(this.parent, linkElement);
		}
		this.elements = [];
	}
}
