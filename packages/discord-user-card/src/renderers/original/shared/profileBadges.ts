import type {
	DiscordUserCardProperties,
} from "@discord-user-card/core";
import {
	badgeToUrl,
	orderBadges,
} from "@discord-user-card/core";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, removeElement, setClasses } from "../../util.js";

export class BadgesRenderer implements Renderer {
	elements = {
		wrapper: document.createElement("div"),
		badges: {} as {
			[key: string]: HTMLImageElement;
		},
	};

	constructor(public readonly parent: Element, private readonly style: "card" | "profile") { }

	async render({ user }: Required<DiscordUserCardProperties>): Promise<void> {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.wrapper, ["class"]);
		for (const badge of Object.values(this.elements.badges))
			clearUnexpectedAttributes(badge, ["src", "alt", "class"]);

		// ? Set the class of the wrapper element
		setClasses(this.elements.wrapper, {
			duc_profile_badges: true,
			duc_user_card: this.style === "card",
			duc_user_profile: this.style === "profile",
		});

		// ? Loop through the badges of the user and create an element for each badge
		const badges = orderBadges(user.badges || []).map(badgeToUrl);
		for (const badge of badges) {
			// ? Create the element if it does not exist
			const element = this.elements.badges[badge] || document.createElement("img");

			// ? Set the attributes of the element
			element.setAttribute("src", badge);
			element.setAttribute("alt", " ");
			setClasses(element, {
				duc_profile_badge: true,
			});

			// ? Save the element
			this.elements.badges[badge] = element;
		}

		// ? Remove any badges that are not in the user's badges
		for (const badge in this.elements.badges) {
			if (!badges.includes(badge)) {
				this.elements.badges[badge]?.remove();
				delete this.elements.badges[badge];
			}
		}

		// ? Append the elements to the wrapper element
		for (const badge of Object.values(this.elements.badges))
			addElement(this.elements.wrapper, badge);

		// ? Append the wrapper element to the parent element
		addElement(this.parent, this.elements.wrapper);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.wrapper);
	}
}
