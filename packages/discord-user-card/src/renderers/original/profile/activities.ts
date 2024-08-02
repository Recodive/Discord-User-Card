import type { DiscordUserCardProperties } from "@discord-user-card/core";
import { ActivityType } from "@discord-user-card/core";
import type { Renderer } from "../../../functions/Renderer.js";
import type { Activity } from "../shared/activities.js";
import { ActivityContentRenderer, ButtonsRenderer, TimebarRenderer, mapActivity } from "../shared/activities.js";
import { addElement, clearUnexpectedAttributes, destoryChildren, removeElement, renderChildren, renderChildrenSkeleton, setClasses } from "../../util.js";

export class ActivitiesRender implements Renderer {
	children: {
		[index: string]: ActivityRender;
	} = {};

	constructor(public readonly parent: Element) { }

	async render({ activities }: Required<DiscordUserCardProperties>): Promise<void> {
		// ? Get all valid activities
		const validActivities = activities.filter(activity => activity.type !== ActivityType.Custom);

		// ? Map the activities
		const mappedActivities = validActivities.map(mapActivity).filter((activity): activity is Activity => Boolean(activity));

		// ? If there are no activities, remove the element
		if (mappedActivities.length === 0) {
			destoryChildren(this.children);
			this.children = {};
			return;
		}

		// ? Render the activities
		for (const [index, activity] of mappedActivities.entries()) {
			if (!this.children[index]) {
				this.children[index] = new ActivityRender(this.parent);
			}
			await this.children[index].render(activity);
		}

		// ? Remove the rest of the children
		for (let i = mappedActivities.length; i < Object.keys(this.children).length; i++) {
			this.children[i]?.destroy();
			delete this.children[i];
		}
	}

	renderSkeleton(): void {
		renderChildrenSkeleton(this.children, undefined);
	}

	destroy(): void {
		destoryChildren(this.children);
	}
}

class ActivityRender implements Renderer<Activity> {
	elements = {
		section: document.createElement("div"),
		headerContainer: document.createElement("div"),
		header: document.createElement("h2"),
		content: document.createElement("div"),
	};

	children: {
		content: ActivityContentRenderer;
		timebar: TimebarRenderer;
		buttons: ButtonsRenderer;
	};

	constructor(public readonly parent: Element) {
		const content = new ActivityContentRenderer(this.elements.content);
		this.children = {
			content,
			timebar: new TimebarRenderer(content.elements.details),
			buttons: new ButtonsRenderer(this.elements.content),
		};
	}

	async render(props: Activity): Promise<void> {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.section, ["class"]);
		clearUnexpectedAttributes(this.elements.headerContainer, ["class"]);
		clearUnexpectedAttributes(this.elements.header, ["class"]);
		clearUnexpectedAttributes(this.elements.content, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.section, {
			duc_section: true,
			duc_activity: true,
			duc_activity_profile: true,
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
		this.elements.header.textContent = props.title;
		addElement(this.elements.headerContainer, this.elements.header);
		addElement(this.elements.section, this.elements.content);
		await renderChildren(this.children, props);
	}

	renderSkeleton(): void {
		// ? In Profile card the activites are not rendered in skeleton state (it will always be on the "User Info" tab)
		removeElement(this.parent, this.elements.section);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.section);
		destoryChildren(this.children);
	}
}
