import type { DiscordUserCardProperties } from "@discord-user-card/core";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, destoryChildren, removeElement, renderChildren, setClasses } from "../../util.js";
import { UsernameRenderer } from "../shared/username.js";
import { CustomStatusRenderer } from "../shared/customStatus.js";
import { AboutMeRender } from "../shared/aboutMe.js";
import { MemberSinceRenderer } from "../shared/memberSince.js";
import { ActivitiesRender } from "./activities.js";

export class BodyRenderer implements Renderer {
	elements = {
		outer: document.createElement("div"),
		inner: document.createElement("div"),
	};

	children = {
		username: new UsernameRenderer(this.elements.inner),
		customStatus: new CustomStatusRenderer(this.elements.inner),
		tabBar: new TabBarRenderer(this.elements.inner),
	};

	constructor(public readonly parent: Element) { }

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.outer, ["class"]);
		clearUnexpectedAttributes(this.elements.inner, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.outer, {
			duc_profile_body: true,
		});
		setClasses(this.elements.inner, {
			duc_profile_body_inner: true,
		});

		// ? Render the elements
		addElement(this.parent, this.elements.outer);
		addElement(this.elements.outer, this.elements.inner);
		await renderChildren(this.children, props);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.outer);
		destoryChildren(this.children);
	}
}

class TabBarRenderer implements Renderer {
	elements = {
		outer: document.createElement("div"),
		inner: document.createElement("div"),
		infoTab: document.createElement("div"),
		activityTab: document.createElement("div"),
		scrollerInfo: document.createElement("div"),
		scrollerActivity: document.createElement("div"),
	};

	children = {
		aboutMe: new AboutMeRender(this.elements.scrollerInfo),
		memberSince: new MemberSinceRenderer(this.elements.scrollerInfo),
		activities: new ActivitiesRender(this.elements.scrollerActivity),
	};

	constructor(public readonly parent: Element) { }

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.outer, ["class"]);
		clearUnexpectedAttributes(this.elements.inner, ["class"]);
		clearUnexpectedAttributes(this.elements.infoTab, ["class", "aria-selected", "role", "tabindex", "onclick"]);
		clearUnexpectedAttributes(this.elements.activityTab, ["class", "aria-selected", "role", "tabindex", "onclick"]);
		clearUnexpectedAttributes(this.elements.scrollerInfo, ["class", "aria-hidden"]);
		clearUnexpectedAttributes(this.elements.scrollerActivity, ["class", "aria-hidden"]);

		// ? Set the class of the elements
		setClasses(this.elements.outer, {
			duc_profile_tab_bar: true,
		});
		setClasses(this.elements.inner, {
			duc_profile_tab_bar_inner: true,
		});
		setClasses(this.elements.infoTab, {
			duc_profile_tab_bar_item: true,
		});
		setClasses(this.elements.activityTab, {
			duc_profile_tab_bar_item: true,
		});
		setClasses(this.elements.scrollerInfo, {
			duc_profile_tab_scroller: true,
			duc_profile_info_tab: true,
		});
		setClasses(this.elements.scrollerActivity, {
			duc_profile_tab_scroller: true,
			duc_profile_activity_tab: true,
		});

		// ? Set the attributes of the elements
		if (this.elements.infoTab.getAttribute("aria-selected") === null)
			this.elements.infoTab.setAttribute("aria-selected", "true");
		this.elements.infoTab.setAttribute("role", "tab");
		this.elements.infoTab.setAttribute("tabindex", "0");

		if (this.elements.activityTab.getAttribute("aria-selected") === null)
			this.elements.activityTab.setAttribute("aria-selected", "false");
		this.elements.activityTab.setAttribute("role", "tab");
		this.elements.activityTab.setAttribute("tabindex", "0");

		if (this.elements.scrollerInfo.getAttribute("aria-hidden") === null)
			this.elements.scrollerInfo.setAttribute("aria-hidden", "false");

		if (this.elements.scrollerActivity.getAttribute("aria-hidden") === null)
			this.elements.scrollerActivity.setAttribute("aria-hidden", "true");

		// ? Set the text of the elements
		this.elements.infoTab.textContent = "User Info";
		this.elements.activityTab.textContent = "Activity";

		// ? Set the onclick of the elements
		this.elements.infoTab.setAttribute("onclick", "this.setAttribute('aria-selected', 'true'); this.setAttribute('tabindex', '0'); this.parentElement?.parentElement?.parentElement?.querySelector('.duc_profile_info_tab')?.setAttribute('aria-hidden', 'false'); this.nextElementSibling.setAttribute('aria-selected', 'false'); this.nextElementSibling.setAttribute('tabindex', '-1'); this.parentElement?.parentElement?.parentElement?.querySelector('.duc_profile_activity_tab')?.setAttribute('aria-hidden', 'true');");
		this.elements.activityTab.setAttribute("onclick", "this.setAttribute('aria-selected', 'true'); this.setAttribute('tabindex', '0'); this.parentElement?.parentElement?.parentElement?.querySelector('.duc_profile_activity_tab')?.setAttribute('aria-hidden', 'false'); this.previousElementSibling.setAttribute('aria-selected', 'false'); this.previousElementSibling.setAttribute('tabindex', '-1'); this.parentElement?.parentElement?.parentElement?.querySelector('.duc_profile_info_tab')?.setAttribute('aria-hidden', 'true');");

		// ? Render the elements
		addElement(this.parent, this.elements.outer);
		addElement(this.elements.outer, this.elements.inner);
		addElement(this.elements.inner, this.elements.infoTab);
		addElement(this.elements.inner, this.elements.activityTab);
		addElement(this.parent, this.elements.scrollerInfo);
		addElement(this.parent, this.elements.scrollerActivity);

		await renderChildren(this.children, props);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.outer);
		destoryChildren(this.children);
	}
}
