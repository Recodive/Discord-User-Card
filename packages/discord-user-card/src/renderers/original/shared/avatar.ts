import type { DiscordUserCardProperties } from "@discord-user-card/core";
import { ColorUtils } from "@discord-user-card/core";
import {
	addElement,
	clearUnexpectedAttributes,
	getUserAvatar,
	getUserAvatarDecoration,
	getUserStatus,
	removeElement,
	renderChildren,
	setClasses,
	setStyles,
} from "../../util.js";
import type { Renderer } from "../../../functions/Renderer.js";

export class AvatarRenderer implements Renderer {
	elements = {
		wrapper: document.createElement("div"),
		inner: document.createElement("div"),
		svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		foreignObject: document.createElementNS("http://www.w3.org/2000/svg", "foreignObject"),
		stack: document.createElement("div"),
		img: document.createElement("img"),
		circle: document.createElementNS("http://www.w3.org/2000/svg", "circle"),
		rect: document.createElementNS("http://www.w3.org/2000/svg", "rect"),
	};

	children: {
		avatarDecoration: AvatarDecorationRenderer;
	};

	lastProps: Required<DiscordUserCardProperties> | null = null;

	rerender() {
		if (!this.lastProps)
			return;
		this.render(this.lastProps);
	}

	boundRerender = this.rerender.bind(this);
	reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	constructor(public readonly parent: Element, private readonly style: "card" | "profile") {
		this.children = {
			avatarDecoration: new AvatarDecorationRenderer(this.elements.inner, this.style),
		};
		window.addEventListener("focus", this.boundRerender);
		window.addEventListener("blur", this.boundRerender);
		this.reduceMotion.addEventListener("change", this.boundRerender);
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		this.lastProps = props;
		const { user } = props;

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.wrapper, ["class"]);
		clearUnexpectedAttributes(this.elements.inner, ["class", "role", "aria-label", "aria-hidden"]);
		clearUnexpectedAttributes(this.elements.svg, ["width", "height", "viewBox", "aria-hidden", "class"]);
		clearUnexpectedAttributes(this.elements.foreignObject, ["x", "y", "width", "height", "mask"]);
		clearUnexpectedAttributes(this.elements.stack, ["class"]);
		clearUnexpectedAttributes(this.elements.img, ["src", "alt", "class", "aria-hidden"]);
		clearUnexpectedAttributes(this.elements.circle, ["fill", "r", "cx", "cy", "style"]);
		clearUnexpectedAttributes(this.elements.rect, ["width", "height", "x", "y", "fill", "mask"]);

		// ? Set the class of the wrapper element
		setClasses(this.elements.wrapper, {
			duc_avatar_wrapper: true,
			duc_avatar_position_premium: !!user.banner && this.style === "card",
			duc_avatar_position_normal: !user.banner && this.style === "card",
			duc_avatar_position_profile: this.style === "profile",
		});

		// ? Find the user's status
		const { status, color: statusColor } = getUserStatus(user);
		let circleColor = "black";
		if (user.themeColors) {
			circleColor
				= ColorUtils.getDarkness(user.themeColors.primary) > 0.5
					? "black"
					: "white";
		}

		// ? Set the attributes of the inner element
		this.elements.inner.setAttribute("role", "img");
		this.elements.inner.setAttribute("aria-label", `${user.username}, ${status}`);
		this.elements.inner.setAttribute("aria-hidden", "false");
		setClasses(this.elements.inner, {
			duc_avatar_wrapper_inner: true,
		});

		// ? Set the attributes of the svg element
		this.elements.svg.setAttribute("width", this.style === "card" ? "92" : "138");
		this.elements.svg.setAttribute("height", this.style === "card" ? "92" : "138");
		this.elements.svg.setAttribute("viewBox", this.style === "card" ? "0 0 92 92" : "0 0 138 138");
		this.elements.svg.setAttribute("aria-hidden", "true");
		setClasses(this.elements.svg, {
			duc_avatar_svg: true,
		});

		// ? Set the attributes of the foreignObject element
		this.elements.foreignObject.setAttribute("x", "0");
		this.elements.foreignObject.setAttribute("y", "0");
		this.elements.foreignObject.setAttribute("width", this.style === "card" ? "80" : "120");
		this.elements.foreignObject.setAttribute("height", this.style === "card" ? "80" : "120");
		this.elements.foreignObject.setAttribute("mask", this.style === "card" ? "url(#svg-mask-avatar-status-round-80)" : "url(#svg-mask-avatar-status-round-120)");

		// ? Set the attributes of the stack element
		setClasses(this.elements.stack, {
			duc_avatar_stack: true,
		});

		// ? Set the attributes of the img element
		const avatar = getUserAvatar(user);
		this.elements.img.setAttribute(
			"src",
			avatar.includes("cdn.discordapp.com")
				? `${avatar}?size=${this.style === "card" ? "80" : "128"}`
				: avatar,
		);
		this.elements.img.setAttribute("alt", " ");
		setClasses(this.elements.img, {
			duc_avatar: true,
		});

		// ? Set the attributes of the circle element
		this.elements.circle.setAttribute("fill", circleColor);
		this.elements.circle.setAttribute("r", this.style === "card" ? "14" : "20");
		this.elements.circle.setAttribute("cx", this.style === "card" ? "68" : "100");
		this.elements.circle.setAttribute("cy", this.style === "card" ? "68" : "100");
		setStyles(this.elements.circle, {
			opacity: "0.45",
		});

		// ? Set the attributes of the rect element
		this.elements.rect.setAttribute("width", this.style === "card" ? "16" : "24");
		this.elements.rect.setAttribute("height", this.style === "card" ? "16" : "24");
		this.elements.rect.setAttribute("x", this.style === "card" ? "60" : "88");
		this.elements.rect.setAttribute("y", this.style === "card" ? "60" : "88");
		this.elements.rect.setAttribute("fill", statusColor);
		this.elements.rect.setAttribute("mask", `url(#svg-mask-status-${status})`);

		// ? Append the elements to each other
		addElement(this.parent, this.elements.wrapper);
		addElement(this.elements.wrapper, this.elements.inner);
		addElement(this.elements.inner, this.elements.svg);
		addElement(this.elements.svg, this.elements.foreignObject);
		addElement(this.elements.foreignObject, this.elements.stack);
		addElement(this.elements.stack, this.elements.img);
		addElement(this.elements.svg, this.elements.circle);
		addElement(this.elements.svg, this.elements.rect);

		// ? Render the avatar decoration
		await renderChildren(this.children, props);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.wrapper);
		window.removeEventListener("focus", this.boundRerender);
		window.removeEventListener("blur", this.boundRerender);
		this.reduceMotion.removeEventListener("change", this.boundRerender);
	}
}

class AvatarDecorationRenderer implements Renderer {
	elements = {
		svg: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		foreignObject: document.createElementNS("http://www.w3.org/2000/svg", "foreignObject"),
		stack: document.createElement("div"),
		img: document.createElement("img"),
	};

	constructor(public readonly parent: Element, private readonly style: "card" | "profile") { }

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		const { user } = props;
		const decoration = getUserAvatarDecoration(user);
		if (!decoration) {
			return removeElement(this.parent, this.elements.svg);
		}

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.svg, ["width", "height", "viewBox", "aria-hidden"]);
		clearUnexpectedAttributes(this.elements.foreignObject, ["x", "y", "width", "height", "mask"]);
		clearUnexpectedAttributes(this.elements.stack, ["class"]);
		clearUnexpectedAttributes(this.elements.img, ["src", "alt", "class", "aria-hidden"]);

		// ? Set the attributes of the svg element
		this.elements.svg.setAttribute("width", this.style === "card" ? "108" : "162");
		this.elements.svg.setAttribute("height", this.style === "card" ? "96" : "144");
		this.elements.svg.setAttribute("viewBox", this.style === "card" ? "0 0 108 96" : "0 0 162 144");
		this.elements.svg.setAttribute("aria-hidden", "true");
		setClasses(this.elements.svg, {
			duc_avatar_decoration: true,
		});

		// ? Set the attributes of the foreignObject element
		this.elements.foreignObject.setAttribute("x", "0");
		this.elements.foreignObject.setAttribute("y", "0");
		this.elements.foreignObject.setAttribute("width", this.style === "card" ? "96" : "144");
		this.elements.foreignObject.setAttribute("height", this.style === "card" ? "96" : "144");
		this.elements.foreignObject.setAttribute("mask", this.style === "card" ? "url(#svg-mask-avatar-decoration-status-round-80)" : "url(#svg-mask-avatar-decoration-status-round-120)");

		// ? Set the attributes of the stack element
		setClasses(this.elements.stack, {
			duc_avatar_stack: true,
		});

		// ? Set the attributes of the img element
		this.elements.img.setAttribute("src", `${decoration}&size=${this.style === "card" ? "96" : "160"}`);
		this.elements.img.setAttribute("alt", " ");
		this.elements.img.setAttribute("aria-hidden", "true");
		setClasses(this.elements.img, {
			duc_avatar: true,
		});

		// ? Append the elements to each other
		addElement(this.parent, this.elements.svg);
		addElement(this.elements.svg, this.elements.foreignObject);
		addElement(this.elements.foreignObject, this.elements.stack);
		addElement(this.elements.stack, this.elements.img);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.svg);
	}
}
