import {
	defaultUserCardProperties,
	DiscordUserCardProperties,
} from "@discord-user-card/core";
import {
	ClassObject,
	parseClassObject,
	parseStyleObject,
	RenderFunction,
} from "../util.js";
import { renderAvatar } from "./avatar.js";
import { renderBanner } from "./banner.js";
import { masks } from "./masks.js";
import { renderProfileBadges } from "./profileBadges.js";
import { renderInfoSection } from "./infoSection.js";
import { getUserTheming } from "../../functions/getUserTheming.js";

export function setupOriginalDiscordUserCard(
	element: HTMLDivElement
): RenderFunction {
	//? Make a render function that takes in the properties of the user card
	async function render(props: DiscordUserCardProperties): Promise<void> {
		//? Destructure the user and activities from the props, and set them to the default values if they are not provided
		const { user, activities, theme } = {
			...defaultUserCardProperties,
			...props,
		};

		//? Set the aria-label of the element to the username of the user
		element.setAttribute("aria-label", user.username);
		//? Add the class "duc_root" to the element
		element.classList.add("duc_root");

		//? Generate the style for the user car
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
		} = getUserTheming(user);

		const style = {
			"--profile-gradient-primary-color": primaryColor,
			"--profile-gradient-secondary-color": secondaryColor,
			"--profile-gradient-overlay-color": overlayColor,
			"--profile-gradient-button-color": buttonColor,
			"--profile-body-background-color": backgroundColor,
			"--profile-body-divider-color": dividerColor,
			"--custom-theme-mix-base-hsl":
				"198.46153846153845 100% 5.098039215686274%",
			"--custom-theme-mix-base": "rgb(0,18,26)",
			"--custom-theme-mix-text": "rgb(223,240,214)",
			"--custom-theme-mix-amount-base": "30%",
			"--custom-theme-mix-amount-text": "70%",
		};

		if (themeMixBaseHsl !== undefined)
			style["--custom-theme-mix-base-hsl"] = themeMixBaseHsl;
		if (themeMixBase !== undefined)
			style["--custom-theme-mix-base"] = themeMixBase;
		if (themeMixText !== undefined)
			style["--custom-theme-mix-text"] = themeMixText;
		if (themeMixAmountBase !== undefined)
			style["--custom-theme-mix-amount-base"] = themeMixAmountBase;
		if (themeMixAmountText !== undefined)
			style["--custom-theme-mix-amount-text"] = themeMixAmountText;

		//? Generate the classes for the user card
		const classes: ClassObject = {
			duc_user_profile_outer: true,
			duc_user_profile_themed: !!user.themeColors,
			[`theme-${themeOverwrite ?? theme}`]: true,
		};

		//? Set the innerHTML of the element to the user card
		element.innerHTML = `
			${masks}
			<div class="${parseClassObject(classes)}" style="${parseStyleObject(style)}">
				<div class="duc_user_profile_inner">
					${await renderBanner(user)}
					${renderAvatar(user)}
					${renderProfileBadges(user)}
					${renderInfoSection(user, activities)}
				</div>
			</div>
		`;
	}

	return {
		render,
	};
}
