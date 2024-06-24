import type {
	DiscordUserCardProperties,
} from "@discord-user-card/core";
import {
	userIdToTimestamp,
} from "@discord-user-card/core";
import type { Renderer } from "../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, destoryChildren, setClasses } from "../util.js";
import { UsernameRenderer } from "./username.js";
import { CustomStatusRenderer } from "./customStatus.js";
import { ActivitiesRender } from "./activities.js";
import { AboutMeRender } from "./aboutMe.js";

export class InfoSectionRenderer implements Renderer {
	elements = {
		section: document.createElement("div"),
		divider: document.createElement("div"),
		scroller: document.createElement("div"),
	};

	children = {
		username: new UsernameRenderer(this.elements.section),
		customStatus: new CustomStatusRenderer(this.elements.section),
		aboutMe: new AboutMeRender(this.elements.scroller),
		memberSince: new MemberSinceRenderer(this.elements.scroller),
		activities: new ActivitiesRender(this.elements.scroller),
	};

	constructor(public readonly parent: Element) { }

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.section, ["class"]);
		clearUnexpectedAttributes(this.elements.divider, ["class"]);
		clearUnexpectedAttributes(this.elements.scroller, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.section, {
			duc_user_section: true,
		});
		setClasses(this.elements.divider, {
			duc_divider: true,
		});
		setClasses(this.elements.scroller, {
			duc_scroller: true,
		});

		// ? Render the elements
		addElement(this.parent, this.elements.section);
		await this.children.username.render(props);
		await this.children.customStatus.render(props);
		addElement(this.elements.section, this.elements.divider);
		addElement(this.elements.section, this.elements.scroller);
		await this.children.aboutMe.render(props);
		await this.children.memberSince.render(props);
		await this.children.activities.render(props);
	}

	destroy(): void {
		destoryChildren(this.elements);
	}
}

class MemberSinceRenderer implements Renderer {
	elements = {
		section: document.createElement("div"),
		title: document.createElement("h2"),
		text: document.createElement("div"),
	};

	constructor(public readonly parent: Element) { }

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		const { user } = props;

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.section, ["class"]);
		clearUnexpectedAttributes(this.elements.title, ["class"]);
		clearUnexpectedAttributes(this.elements.text, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.section, {
			duc_section: true,
		});
		setClasses(this.elements.title, {
			duc_section_title: true,
		});
		setClasses(this.elements.text, {
			duc_section_text: true,
		});

		// ? Set the text of the title element
		this.elements.title.textContent = "Member Since";

		// ? Set the text of the text element
		const timestamp = userIdToTimestamp(user.id);
		const formatter = new Intl.DateTimeFormat(
			navigator.language || "en",
			// Sep 8, 2021
			{ month: "short", day: "numeric", year: "numeric" },
		);
		const memberSince = formatter.format(new Date(timestamp));
		this.elements.text.textContent = memberSince;

		// ? Render the elements
		addElement(this.parent, this.elements.section);
		addElement(this.elements.section, this.elements.title);
		addElement(this.elements.section, this.elements.text);
	}

	destroy(): void { }
}
