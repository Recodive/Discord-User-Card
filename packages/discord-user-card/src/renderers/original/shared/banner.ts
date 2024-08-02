import type { DiscordUserCardProperties } from "@discord-user-card/core";
import {
	addElement,
	clearUnexpectedAttributes,
	getUserBanner,
	getUserBannerColor,
	removeElement,
	setClasses,
	setStyles,
} from "../../util.js";
import type { Renderer } from "../../../functions/Renderer.js";

export class BannerRenderer implements Renderer {
	elements = {
		wrapper: document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		mask: document.createElementNS("http://www.w3.org/2000/svg", "mask"),
		rect: document.createElementNS("http://www.w3.org/2000/svg", "rect"),
		circle: document.createElementNS("http://www.w3.org/2000/svg", "circle"),
		foreignObject: document.createElementNS("http://www.w3.org/2000/svg", "foreignObject"),
		div: document.createElement("div"),
	};

	id = crypto.randomUUID().slice(0, 8);

	lastProps: Required<DiscordUserCardProperties> | null = null;

	rerender() {
		if (!this.lastProps)
			return;
		this.render(this.lastProps);
	}

	listenersBound = false;
	boundRerender = this.rerender.bind(this);
	reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	constructor(public readonly parent: Element, private readonly style: "card" | "profile") { }

	private clearUnexpectedAttributes(skeleton = false) {
		clearUnexpectedAttributes(this.elements.wrapper, ["class", "viewBox", "style"]);
		clearUnexpectedAttributes(this.elements.mask, ["id"]);
		clearUnexpectedAttributes(this.elements.rect, ["fill", "x", "y", "width", "height"]);
		clearUnexpectedAttributes(this.elements.circle, ["fill", "cx", "cy", "r"]);
		clearUnexpectedAttributes(this.elements.foreignObject, ["x", "y", "width", "height", "overflow", "mask"]);
		clearUnexpectedAttributes(this.elements.div, skeleton ? ["class"] : ["class", "style"]);
	}

	private setAttributes(hasBanner: boolean, hasThemeColors: boolean) {
		// ? Set the viewBox of the wrapper element
		this.elements.wrapper.setAttribute("viewBox", this.style === "card"
			? hasBanner ? "0 0 340 120" : "0 0 340 60"
			: hasBanner ? "0 0 600 212" : "0 0 600 106");

		// ? Set the style of the wrapper element
		setStyles(this.elements.wrapper, {
			"min-width": this.style === "card" ? "340px" : "600px",
			"min-height": this.style === "card"
				? hasBanner ? "120px" : "60px"
				: hasBanner ? "212px" : "106px",
		});

		// ? Set the id of the mask element
		this.elements.mask.setAttribute("id", `mask_avatar_${this.id}`);

		// ? Set the attributes of the rect element
		this.elements.rect.setAttribute("fill", "white");
		this.elements.rect.setAttribute("x", "0");
		this.elements.rect.setAttribute("y", "0");
		this.elements.rect.setAttribute("width", "100%");
		this.elements.rect.setAttribute("height", "100%");

		// ? Set the attributes of the circle element
		this.elements.circle.setAttribute("fill", "black");
		this.elements.circle.setAttribute(
			"cx",
			this.style === "card"
				? hasBanner
					? hasThemeColors ? "58" : "62"
					: "62"
				: "82",
		);
		this.elements.circle.setAttribute(
			"cy",
			this.style === "card"
				? hasBanner
					? hasThemeColors ? "112" : "116"
					: "56"
				: hasBanner ? "207" : "101",
		);
		this.elements.circle.setAttribute("r", this.style === "card" ? "46" : "68");

		// ? Set the attributes of the foreignObject element
		this.elements.foreignObject.setAttribute("x", "0");
		this.elements.foreignObject.setAttribute("y", "0");
		this.elements.foreignObject.setAttribute("width", "100%");
		this.elements.foreignObject.setAttribute("height", "100%");
		this.elements.foreignObject.setAttribute("overflow", "visible");
		this.elements.foreignObject.setAttribute("mask", `url(#mask_avatar_${this.id})`);
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		if (!this.listenersBound) {
			window.addEventListener("focus", this.boundRerender);
			window.addEventListener("blur", this.boundRerender);
			this.reduceMotion.addEventListener("change", this.boundRerender);
			this.listenersBound = true;
		}

		this.lastProps = props;
		const { user } = props;
		// ? Clear unexpected attributes from the elements
		this.clearUnexpectedAttributes();

		// ? Set the class of the wrapper element
		setClasses(this.elements.wrapper, {
			duc_banner_wrapper: true,
		});

		// ? Generate the banner for the user
		const banner = getUserBanner(user);
		const bannerColor = await getUserBannerColor(user);

		// ? Set the attributes of the elements
		this.setAttributes(!!banner, !!user.themeColors);

		// ? Set the class of the div element
		setClasses(this.elements.div, {
			duc_banner: true,
			duc_banner_premium: !!banner,
			duc_user_card: this.style === "card",
			duc_user_profile: this.style === "profile",
		});

		// ? Set the style of the div element
		setStyles(this.elements.div, {
			"background-color": bannerColor,
			...(banner && {
				"background-image":
					banner.includes("cdn.discordapp.com")
						? `url('${banner}?size=480')`
						: `url('${banner}')`,
			}),
		});

		// ? Append the elements to the parent element
		addElement(this.parent, this.elements.wrapper);
		addElement(this.elements.wrapper, this.elements.mask);
		addElement(this.elements.mask, this.elements.rect);
		addElement(this.elements.mask, this.elements.circle);
		addElement(this.elements.wrapper, this.elements.foreignObject);
		addElement(this.elements.foreignObject, this.elements.div);
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		if (this.listenersBound) {
			window.removeEventListener("focus", this.boundRerender);
			window.removeEventListener("blur", this.boundRerender);
			this.reduceMotion.removeEventListener("change", this.boundRerender);
			this.listenersBound = false;
		}

		this.lastProps = props;
		const { user } = props;
		// ? Clear unexpected attributes from the elements
		this.clearUnexpectedAttributes(true);

		// ? Set the class of the wrapper element
		setClasses(this.elements.wrapper, {
			duc_banner_wrapper: true,
		});

		// ? Generate the banner for the user
		const hasBanner = !!getUserBanner(user);

		// ? Set the attributes of the elements
		this.setAttributes(hasBanner, !!user.themeColors);

		// ? Set the class of the div element
		setClasses(this.elements.div, {
			duc_banner: true,
			duc_banner_premium: !!hasBanner,
			duc_user_card: this.style === "card",
			duc_user_profile: this.style === "profile",
			duc_skeleton: true,
		});

		// ? Append the elements to the parent element
		addElement(this.parent, this.elements.wrapper);
		addElement(this.elements.wrapper, this.elements.mask);
		addElement(this.elements.mask, this.elements.rect);
		addElement(this.elements.mask, this.elements.circle);
		addElement(this.elements.wrapper, this.elements.foreignObject);
		addElement(this.elements.foreignObject, this.elements.div);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.wrapper);
		window.removeEventListener("focus", this.boundRerender);
		window.removeEventListener("blur", this.boundRerender);
		this.reduceMotion.removeEventListener("change", this.boundRerender);
	}
}
