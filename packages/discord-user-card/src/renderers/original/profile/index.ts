import type {
	DiscordUserCardProperties,
} from "@discord-user-card/core";
import type {
	ClassObject,
	StyleObject,
} from "../../util.js";
import {
	addElement,
	clearUnexpectedAttributes,
	destoryChildren,
	removeElement,
	renderChildren,
	renderChildrenSkeleton,
	setClasses,
	setStyles,
} from "../../util.js";
import { getUserTheming } from "../../../functions/getUserTheming.js";
import type { Renderer } from "../../../functions/Renderer.js";
import { PrefetchRenderer } from "../shared/prefetch.js";
import { masks } from "../shared/masks.js";
import { ProfileEffectsRenderer } from "../shared/profileEffects.js";
import { HeaderRenderer } from "./header.js";
import { BodyRenderer } from "./body.js";

export class OriginalDiscordUserProfile implements Renderer {
	masks = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	containers = {
		outer: document.createElement("div"),
		inner: document.createElement("div"),
	};

	children: {
		prefetch: PrefetchRenderer;
		profileEffects: ProfileEffectsRenderer;
		header: HeaderRenderer;
		body: BodyRenderer;
	};

	constructor(public readonly parent: Element) {
		// ? Set the children in here because this.parent is otherwise not available
		this.children = {
			prefetch: new PrefetchRenderer(this.parent, "profile"),
			profileEffects: new ProfileEffectsRenderer(this.parent, this.parent),
			header: new HeaderRenderer(this.containers.inner),
			body: new BodyRenderer(this.containers.inner),
		};

		this.masks.setAttribute("viewBox", "0 0 1 1");
		this.masks.setAttribute("aria-hidden", "true");
		const maskStyles: StyleObject = {
			"position": "absolute",
			"pointer-events": "none",
			"top": "-1px",
			"left": "-1px",
			"width": "1px",
			"height": "1px",
		};
		setStyles(this.masks, maskStyles);
		this.masks.innerHTML = masks;
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		// ? Destructure the user and activities from the props, and set them to the default values if they are not provided
		const { user } = props;

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.parent, ["aria-label", "class"]);
		clearUnexpectedAttributes(this.containers.outer, ["class", "style"]);
		clearUnexpectedAttributes(this.containers.inner, ["class"]);

		// ? Set the aria-label and class of the parent element
		this.parent.setAttribute("aria-label", user.username);
		setClasses(this.parent, { duc_root: true, duc_user_profile: true });

		// ? Generate the style for the user card
		const {
			backgroundColor,
			buttonColor,
			dividerColor,
			overlayColor,
			primaryColor,
			secondaryColor,
			themeMixAmountBase,
			themeMixAmountText,
			themeMixBase,
			themeMixBaseHsl,
			themeMixText,
			themeOverwrite,
			roleBackgroundColor,
			roleBorderColor,
		} = getUserTheming(user);

		const stylesOuterContainer: StyleObject = {
			"--profile-gradient-primary-color": primaryColor,
			"--profile-gradient-secondary-color": secondaryColor,
			"--profile-gradient-overlay-color": overlayColor,
			"--profile-gradient-button-color": buttonColor,
			"--profile-body-background-color": backgroundColor,
			"--profile-body-divider-color": dividerColor,
			"--profile-role-pill-background-color": roleBackgroundColor,
			"--profile-role-pill-border-color": roleBorderColor,
			"--custom-theme-mix-base-hsl":
				"198.46153846153845 100% 5.098039215686274%",
			"--custom-theme-mix-base": "rgb(0,18,26)",
			"--custom-theme-mix-text": "rgb(223,240,214)",
			"--custom-theme-mix-amount-base": "30%",
			"--custom-theme-mix-amount-text": "70%",
		};

		if (themeMixBaseHsl !== undefined)
			stylesOuterContainer["--custom-theme-mix-base-hsl"] = themeMixBaseHsl;
		if (themeMixBase !== undefined)
			stylesOuterContainer["--custom-theme-mix-base"] = themeMixBase;
		if (themeMixText !== undefined)
			stylesOuterContainer["--custom-theme-mix-text"] = themeMixText;
		if (themeMixAmountBase !== undefined)
			stylesOuterContainer["--custom-theme-mix-amount-base"] = themeMixAmountBase;
		if (themeMixAmountText !== undefined)
			stylesOuterContainer["--custom-theme-mix-amount-text"] = themeMixAmountText;

		// ? Set the styles of the element
		setStyles(this.containers.outer, stylesOuterContainer);

		// ? Generate the classes for the user card
		const classesOuterContainer: ClassObject = {
			duc_user_profile_outer: true,
			duc_user_profile_themed: !!user.themeColors,
			[`theme-${themeOverwrite ?? "dark"}`]: true,
		};

		// ? Set the classes of the element
		setClasses(this.containers.outer, classesOuterContainer);
		setClasses(this.containers.inner, { duc_user_profile_inner: true });

		// ? Render the user card
		addElement(this.parent, this.masks);
		addElement(this.parent, this.containers.outer);
		addElement(this.containers.outer, this.containers.inner);

		await renderChildren(this.children, props);
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		// ? Destructure the user and activities from the props, and set them to the default values if they are not provided
		const { user } = props;

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.parent, ["aria-label", "class"]);
		clearUnexpectedAttributes(this.containers.outer, ["class", "style"]);
		clearUnexpectedAttributes(this.containers.inner, ["class"]);

		// ? Set the aria-label and class of the parent element
		this.parent.setAttribute("aria-label", user.username);
		setClasses(this.parent, { duc_root: true, duc_user_profile: true });

		// ? Generate the style for the user card
		const {
			themeOverwrite,
		} = getUserTheming(user);
		const {
			backgroundColor,
			buttonColor,
			dividerColor,
			overlayColor,
			primaryColor,
			secondaryColor,
			roleBackgroundColor,
			roleBorderColor,
		} = getUserTheming({
			id: "0",
			username: "username",
		});

		const stylesOuterContainer: StyleObject = {
			"--profile-gradient-primary-color": primaryColor,
			"--profile-gradient-secondary-color": secondaryColor,
			"--profile-gradient-overlay-color": overlayColor,
			"--profile-gradient-button-color": buttonColor,
			"--profile-body-background-color": backgroundColor,
			"--profile-body-divider-color": dividerColor,
			"--profile-role-pill-background-color": roleBackgroundColor,
			"--profile-role-pill-border-color": roleBorderColor,
			"--custom-theme-mix-base-hsl":
				"198.46153846153845 100% 5.098039215686274%",
			"--custom-theme-mix-base": "rgb(0,18,26)",
			"--custom-theme-mix-text": "rgb(223,240,214)",
			"--custom-theme-mix-amount-base": "30%",
			"--custom-theme-mix-amount-text": "70%",
		};

		// ? Set the styles of the element
		setStyles(this.containers.outer, stylesOuterContainer);

		// ? Generate the classes for the user card
		const classesOuterContainer: ClassObject = {
			duc_user_profile_outer: true,
			duc_user_profile_themed: !!user.themeColors,
			[`theme-${themeOverwrite ?? "dark"}`]: true,
			duc_theme_skeleton: true,
		};

		// ? Set the classes of the element
		setClasses(this.containers.outer, classesOuterContainer);
		setClasses(this.containers.inner, { duc_user_profile_inner: true });

		// ? Render the user card
		addElement(this.parent, this.masks);
		addElement(this.parent, this.containers.outer);
		addElement(this.containers.outer, this.containers.inner);

		renderChildrenSkeleton(this.children, props);
	}

	destroy(): void {
		removeElement(this.parent, this.containers.outer);
		destoryChildren(this.children);
	}
}
