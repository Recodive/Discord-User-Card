import type { DiscordUserCardProperties } from "@discord-user-card/core";
import { ActivityType } from "@discord-user-card/core";
import type { Renderer } from "../../../functions/Renderer.js";
import { ActivityContentRenderer, ButtonsRenderer, TimebarRenderer, mapActivity } from "../shared/activities.js";
import { addElement, clearUnexpectedAttributes, destoryChildren, removeElement, renderChildren, renderChildrenSkeleton, setClasses } from "../../util.js";

export class ActivitiesRender implements Renderer {
	elements = {
		section: document.createElement("div"),
		headerContainer: document.createElement("div"),
		header: document.createElement("h2"),
		content: document.createElement("div"),
	};

	children = {
		content: new ActivityContentRenderer(this.elements.content),
		timebar: new TimebarRenderer(this.elements.section),
		buttons: new ButtonsRenderer(this.elements.section),
	};

	constructor(public readonly parent: Element) { }

	private _render(props: Required<DiscordUserCardProperties>, skeleton = false) {
		// ? Get the activity
		const { activities } = props;
		const rawActivity = activities.find(activity => activity.type !== ActivityType.Custom);

		// ? If there is no activity, remove the element
		if (!rawActivity) {
			return removeElement(this.parent, this.elements.section);
		}

		// ? Map the activity
		const activity = mapActivity(rawActivity);

		// ? If the activity is not valid, remove the element
		if (!activity) {
			return removeElement(this.parent, this.elements.section);
		}

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.section, ["class"]);
		clearUnexpectedAttributes(this.elements.headerContainer, ["class"]);
		clearUnexpectedAttributes(this.elements.header, ["class"]);
		clearUnexpectedAttributes(this.elements.content, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.section, {
			duc_section: true,
			duc_activity: true,
		});
		setClasses(this.elements.headerContainer, {
			duc_activity_header_container: true,
		});
		setClasses(this.elements.header, {
			duc_section_title: true,
			duc_activity_header: true,
		});
		setClasses(this.elements.content, {
			duc_activity_content: true,
		});

		// ? Render the elements
		addElement(this.parent, this.elements.section);
		addElement(this.elements.section, this.elements.headerContainer);
		if (skeleton) {
			const titlePill = document.createElement("span");
			setClasses(titlePill, {
				duc_skeleton_pill: true,
			});
			addElement(this.elements.header, titlePill);
		}
		else {
			this.elements.header.textContent = activity.title;
		}
		addElement(this.elements.headerContainer, this.elements.header);
		addElement(this.elements.section, this.elements.content);

		return activity;
	}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		const activity = this._render(props);
		if (activity)
			await renderChildren(this.children, activity);
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		const activity = this._render(props, true);
		if (activity)
			renderChildrenSkeleton(this.children, activity);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.section);
		destoryChildren(this.children);
	}
}
