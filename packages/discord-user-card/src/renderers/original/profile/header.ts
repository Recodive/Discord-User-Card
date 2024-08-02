import type { DiscordUserCardProperties } from "@discord-user-card/core";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, destoryChildren, removeElement, setClasses } from "../../util.js";
import { BannerRenderer } from "../shared/banner.js";
import { AvatarRenderer } from "../shared/avatar.js";
import { BadgesRenderer } from "../shared/profileBadges.js";

export class HeaderRenderer implements Renderer {
	elements = {
		header: document.createElement("header"),
		inner: document.createElement("div"),
		positioner: document.createElement("div"),
	};

	children = {
		banner: new BannerRenderer(this.elements.header, "profile"),
		avatar: new AvatarRenderer(this.elements.inner, "profile"),
		badges: new BadgesRenderer(this.elements.positioner, "profile"),
	};

	constructor(public readonly parent: Element) { }

	private setAttributes(): void {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.header, ["class"]);
		clearUnexpectedAttributes(this.elements.inner, ["class"]);
		clearUnexpectedAttributes(this.elements.positioner, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.header, {
			duc_profile_header: true,
		});
		setClasses(this.elements.inner, {
			duc_profile_header_inner: true,
		});
		setClasses(this.elements.positioner, {
			duc_profile_header_positioner: true,
		});
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		// ? Set the attributes of the elements
		this.setAttributes();

		// ? Render the elements
		addElement(this.parent, this.elements.header);
		await this.children.banner.render(props);
		addElement(this.elements.header, this.elements.inner);
		await this.children.avatar.render(props);
		addElement(this.elements.inner, this.elements.positioner);
		await this.children.badges.render(props);
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		// ? Set the attributes of the elements
		this.setAttributes();

		// ? Render the elements
		addElement(this.parent, this.elements.header);
		this.children.banner.renderSkeleton(props);
		addElement(this.elements.header, this.elements.inner);
		this.children.avatar.renderSkeleton(props);
		addElement(this.elements.inner, this.elements.positioner);
		this.children.badges.renderSkeleton();
	}

	destroy(): void {
		removeElement(this.parent, this.elements.header);
		destoryChildren(this.children);
	}
}
