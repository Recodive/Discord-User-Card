import { type DiscordUserCardProperties, imageToUrl, mapDiscordImageHash } from "@discord-user-card/core";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, destoryChildren, removeElement, renderChildren, renderChildrenSkeleton, setClasses } from "../../util.js";

export class UsernameRenderer implements Renderer {
	elements = {
		section: document.createElement("div"),
	};

	children = {
		username: new UsernameInnerWrapperRenderer(this.elements.section),
		clan: new ClanRenderer(this.elements.section),
	};

	constructor(public readonly parent: Element) { }

	private _render() {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.section, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.section, {
			duc_username_section: true,
		});

		// ? Render the elements
		addElement(this.parent, this.elements.section);
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		this._render();
		await renderChildren(this.children, props);
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		this._render();
		renderChildrenSkeleton(this.children, props);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.section);
		destoryChildren(this.children);
	}
}

class UsernameInnerWrapperRenderer implements Renderer {
	elements = {
		div: document.createElement("div"),
	};

	children = {
		text: new UsernameTextRenderer(this.elements.div),
		pronouns: new PronounsRenderer(this.elements.div),
	};

	constructor(public readonly parent: Element) { }

	private _render() {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.div, []);

		// ? Render the elements
		addElement(this.parent, this.elements.div);
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		this._render();
		await renderChildren(this.children, props);
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		this._render();
		renderChildrenSkeleton(this.children, props);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.div);
		destoryChildren(this.children);
	}
}

class ClanRenderer implements Renderer {
	elements = {
		outer: document.createElement("div"),
		inner: document.createElement("span"),
		img: document.createElement("img"),
		text: document.createElement("span"),
	};

	constructor(public readonly parent: Element) { }

	private setAttributes() {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.outer, ["class"]);
		clearUnexpectedAttributes(this.elements.inner, ["class"]);
		clearUnexpectedAttributes(this.elements.img, ["src", "alt", "class"]);
		clearUnexpectedAttributes(this.elements.text, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.outer, {
			duc_clan: true,
		});
		setClasses(this.elements.inner, {
			duc_clan_inner: true,
		});
		setClasses(this.elements.img, {
			duc_clan_img: true,
		});
		setClasses(this.elements.text, {
			duc_clan_text: true,
		});
	}

	private _render() {
		// ? Render the elements
		addElement(this.parent, this.elements.outer);
		addElement(this.elements.outer, this.elements.inner);
		addElement(this.elements.inner, this.elements.img);
		addElement(this.elements.inner, this.elements.text);
	}

	async render({ user: { clan } }: Required<DiscordUserCardProperties>): Promise<void> {
		if (!clan) {
			return removeElement(this.parent, this.elements.outer);
		}

		// ? Set the attributes of the elements
		this.setAttributes();

		// ? Set the attributes of the elements
		this.elements.img.src = `${imageToUrl({
			image: mapDiscordImageHash(clan.badge)!,
			scope: "clan-badges",
			relatedId: clan.identityGuildId,
			animation: false,
		})}?size=16`;
		this.elements.img.alt = `[${clan.tag}]`;
		this.elements.text.textContent = clan.tag;

		// ? Render the elements
		this._render();
	}

	renderSkeleton({ user: { clan } }: Required<DiscordUserCardProperties>): void {
		if (!clan) {
			return removeElement(this.parent, this.elements.outer);
		}

		// ? Set the attributes of the elements
		this.setAttributes();

		// ? Render the elements
		addElement(this.parent, this.elements.outer);
		addElement(this.elements.outer, this.elements.inner);
		const pill = document.createElement("span");
		setClasses(pill, {
			duc_skeleton_pill: true,
		});
		addElement(this.elements.inner, pill);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.outer);
	}
}

class UsernameTextRenderer implements Renderer {
	elements = {
		display: document.createElement("h1"),
		tag: document.createElement("div"),
		username: document.createElement("span"),
	};

	children = {
		discriminator: new DiscriminatorRenderer(this.elements.tag),
		botTag: new BotTagRenderer(this.elements.tag),
	};

	constructor(public readonly parent: Element) { }

	private _render(props: Required<DiscordUserCardProperties>, skeleton = false) {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.display, ["class"]);
		clearUnexpectedAttributes(this.elements.tag, ["class"]);
		clearUnexpectedAttributes(this.elements.username, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.display, {
			duc_display_name: true,
			duc_skeleton_pill: skeleton,
		});
		setClasses(this.elements.tag, {
			duc_user_tag: true,
		});
		setClasses(this.elements.username, {
			duc_user_tag_username: true,
			duc_skeleton_pill: skeleton,
		});

		// ? Render the elements
		if (!skeleton) {
			this.elements.display.textContent = props.user.displayName ?? props.user.username;
		}
		addElement(this.parent, this.elements.display);
		addElement(this.parent, this.elements.tag);
		if (!skeleton) {
			this.elements.username.textContent = props.user.username;
		}
		addElement(this.elements.tag, this.elements.username);
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		this._render(props);
		await renderChildren(this.children, props);
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		this._render(props, true);
		renderChildrenSkeleton(this.children, props);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.display);
		destoryChildren(this.children);
	}
}

class DiscriminatorRenderer implements Renderer {
	elements = {
		discriminator: document.createElement("span"),
	};

	constructor(public readonly parent: Element) { }

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		if (!props.user.discriminator || props.user.discriminator === "0") {
			return removeElement(this.parent, this.elements.discriminator);
		}

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.discriminator, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.discriminator, {
			duc_discriminator: true,
		});

		// ? Render the elements
		this.elements.discriminator.textContent = `#${props.user.discriminator}`;
		addElement(this.parent, this.elements.discriminator);
	}

	renderSkeleton(): void {
		// ? We don't need to render the discriminator in the skeleton
		removeElement(this.parent, this.elements.discriminator);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.discriminator);
	}
}

class BotTagRenderer implements Renderer {
	elements = {
		wrapper: document.createElement("span"),
		icon: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		paths: document.createElementNS("http://www.w3.org/2000/svg", "path"),
		text: document.createElement("span"),
	};

	constructor(public readonly parent: Element) { }

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		if (!props.user.app && !props.user.system) {
			return removeElement(this.parent, this.elements.wrapper);
		}

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.wrapper, ["class"]);
		clearUnexpectedAttributes(this.elements.icon, ["aria-label", "role", "xmlns", "width", "height", "fill", "viewBox", "aria-hidden"]);
		clearUnexpectedAttributes(this.elements.paths, ["fill", "fill-rule", "d", "clip-rule"]);
		clearUnexpectedAttributes(this.elements.text, ["class"]);

		// ? Set the attributes of the elements
		setClasses(this.elements.wrapper, {
			duc_bot_tag: true,
		});
		this.elements.icon.setAttribute("aria-label", props.user.system ? "System User" : "Verified App");
		this.elements.icon.setAttribute("role", "img");
		this.elements.icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		this.elements.icon.setAttribute("width", "16");
		this.elements.icon.setAttribute("height", "16");
		this.elements.icon.setAttribute("fill", "none");
		this.elements.icon.setAttribute("viewBox", "0 0 24 24");
		this.elements.icon.setAttribute("aria-hidden", "false");
		this.elements.paths.setAttribute("fill", "currentColor");
		this.elements.paths.setAttribute("fill-rule", "evenodd");
		this.elements.paths.setAttribute("d", "M18.7 7.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.29 7.3-7.3a1 1 0 0 1 1.4 0Z");
		this.elements.paths.setAttribute("clip-rule", "evenodd");
		setClasses(this.elements.text, {
			duc_bot_text: true,
		});

		// ? Render the elements
		addElement(this.parent, this.elements.wrapper);
		addElement(this.elements.wrapper, this.elements.icon);
		addElement(this.elements.icon, this.elements.paths);
		this.elements.text.textContent = props.user.system ? "SYSTEM" : "APP";
		addElement(this.elements.wrapper, this.elements.text);
	}

	renderSkeleton(): void {
		// ? We don't need to render the bot tag in the skeleton
		removeElement(this.parent, this.elements.wrapper);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.wrapper);
	}
}

class PronounsRenderer implements Renderer {
	elements = {
		pronouns: document.createElement("div"),
	};

	constructor(public readonly parent: Element) { }

	private _render(props: Required<DiscordUserCardProperties>, skeleton = false) {
		if (!props.user.pronouns) {
			return removeElement(this.parent, this.elements.pronouns);
		}

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.pronouns, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.pronouns, {
			duc_pronouns: true,
			duc_skeleton_pill: skeleton,
		});

		// ? Render the elements
		if (!skeleton) {
			this.elements.pronouns.textContent = props.user.pronouns;
		}
		addElement(this.parent, this.elements.pronouns);
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		this._render(props);
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		this._render(props, true);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.pronouns);
	}
}
