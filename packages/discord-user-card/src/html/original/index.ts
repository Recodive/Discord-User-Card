import {
	ColorUtils,
	defaultUserCardProperties,
	DiscordUserCardProperties,
} from "@discord-user-card/core";
import {
	ClassObject,
	parseClassObject,
	parseStyleObject,
	StyleObject,
} from "../util.js";
import { renderAvatar } from "./avatar.js";
import { renderBanner } from "./banner.js";
import { masks } from "./masks.js";
import { renderProfileBadges } from "./profileBadges.js";
import { renderInfoSection } from "./infoSection.js";

export function setupOriginalDiscordUserCard(element: HTMLDivElement) {
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
		//? Add the theme class to the element, and remove the other theme classes
		element.classList.add(`theme-${theme}`);
		const otherThemes = [...element.classList.values()].filter(
			(c) => c.startsWith("theme-") && c !== `theme-${theme}`
		);
		for (const otherTheme of otherThemes) element.classList.remove(otherTheme);

		//? Generate the style for the user car
		let style: StyleObject;
		if (!user.themeColors) {
			style = {
				"--profile-gradient-primary-color": "var(--background-secondary-alt)",
				"--profile-gradient-secondary-color": "var(--background-secondary-alt)",
				"--profile-gradient-overlay-color": "rgba(0, 0, 0, 0)",
				"--profile-gradient-button-color": "var(--button-secondary-background)",
				"--profile-avatar-border-color": "var(--background-secondary-alt)",
				"--profile-body-background-color": "var(--background-floating)",
				"--profile-body-background-hover": "var(--background-modifier-hover)",
				"--profile-body-divider-color": "var(--background-modifier-accent)",
				"--profile-body-border-color": "var(--border-faint)",
				"--profile-message-input-border-color":
					"var(--background-modifier-accent)",
				"--profile-note-background-color": " var(--background-tertiary)",
				"--profile-role-pill-background-color":
					"var(--background-secondary-alt)",
				"--profile-role-pill-border-color": "var(--interactive-normal)",
			};
		} else {
			const primary = ColorUtils.intToHsl(user.themeColors.primary),
				secondary = ColorUtils.intToHsl(user.themeColors.secondary);

			style = {
				"--profile-gradient-primary-color": `hsla(${primary[0]}, ${primary[1]}%, ${primary[2]}%, 1)`,
				"--profile-gradient-secondary-color": `hsla(${secondary[0]}, ${secondary[1]}%, ${secondary[2]}%, 1)`,
				"--profile-gradient-overlay-color": "hsla(0,0%,0%,0.6)",
				"--profile-gradient-button-color": "hsla(197, 100%, 23.7%, 1)",
				"--profile-avatar-border-color": "hsla(199, 55.8%, 16.9%, 1)",
				"--profile-body-background-color": "hsla(0,0%,0%,0.45)",
				"--profile-body-background-hover": "hsla(0,0%,100%,0.16)",
				"--profile-body-divider-color": "hsla(0, 0%, 100%, 0.24)",
				"--profile-body-border-color": "hsla(0, 0%, 100%, 0.12)",
				"--profile-message-input-border-color": "hsla(112, 30.2%, 37.6%, 1)",
				"--profile-note-background-color": "hsla(0,0%,0%,0.3)",
				"--profile-role-pill-background-color": "hsla(228,6.67%,14.71%,0.5)",
				"--profile-role-pill-border-color": "hsla(0,0%,100%,0.2)",
				"--custom-theme-mix-base-hsl":
					"198.46153846153845 100% 5.098039215686274%",
				"--custom-theme-mix-base": "rgb(0,18,26)",
				"--custom-theme-mix-text": "rgb(223,240,214)",
				"--custom-theme-mix-amount-base": "30%",
				"--custom-theme-mix-amount-text": "70%",
			};
		}

		//? Generate the classes for the user card
		const classes: ClassObject = {
			duc_user_profile_outer: true,
			duc_user_profile_themed: !!user.themeColors,
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
