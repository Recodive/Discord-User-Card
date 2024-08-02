import type { DiscordUserCardProperties } from "@discord-user-card/core";
import { userIdToTimestamp } from "@discord-user-card/core";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, removeElement, setClasses } from "../../util.js";

export class MemberSinceRenderer implements Renderer {
	elements = {
		section: document.createElement("div"),
		title: document.createElement("h2"),
		text: document.createElement("div"),
	};

	constructor(public readonly parent: Element) { }

	private setAttributes() {
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
	}

	private _render() {
		addElement(this.parent, this.elements.section);
		addElement(this.elements.section, this.elements.title);
		addElement(this.elements.section, this.elements.text);
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		const { user } = props;

		// ? Set the attributes of the elements
		this.setAttributes();

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
		this._render();
	}

	renderSkeleton(): void {
		// ? Set the attributes of the elements
		this.setAttributes();

		// ? Set the text of the title element
		const titlePill = document.createElement("span");
		setClasses(titlePill, {
			duc_skeleton_pill: true,
		});
		const textPill = document.createElement("span");
		setClasses(textPill, {
			duc_skeleton_pill: true,
		});

		// ? Render the elements
		this._render();
		addElement(this.elements.title, titlePill);
		addElement(this.elements.text, textPill);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.section);
	}
}
