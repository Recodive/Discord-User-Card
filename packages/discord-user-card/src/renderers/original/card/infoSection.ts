import type {
	DiscordUserCardProperties,
} from "@discord-user-card/core";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, destoryChildren, removeElement, setClasses } from "../../util.js";
import { UsernameRenderer } from "../shared/username.js";
import { CustomStatusRenderer } from "../shared/customStatus.js";
import { MemberSinceRenderer } from "../shared/memberSince.js";
import { AboutMeRender } from "../shared/aboutMe.js";
import { RolesRenderer } from "./roles.js";
import { ActivitiesRender } from "./activities.js";

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
		roles: new RolesRenderer(this.elements.scroller),
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
		await this.children.roles.render(props);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.section);
		destoryChildren(this.elements);
	}
}
