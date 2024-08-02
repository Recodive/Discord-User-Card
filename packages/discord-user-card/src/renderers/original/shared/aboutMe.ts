import type { DiscordUserCardProperties } from "@discord-user-card/core";
import { rerenderInterval, toHTML } from "@discord-user-card/markdown";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, removeElement, setClasses } from "../../util.js";
import { renderElement } from "../../../functions/renderElement.js";

export class AboutMeRender implements Renderer {
	elements = {
		section: document.createElement("div"),
		title: document.createElement("h2"),
		markdown: document.createElement("div"),
	};

	timeout: NodeJS.Timeout | null = null;
	lastProps: Required<DiscordUserCardProperties> | null = null;

	rerender() {
		if (!this.lastProps)
			return;
		this.render(this.lastProps);
	}

	listenersBound = false;
	boundRerender = this.rerender.bind(this);
	reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	constructor(public readonly parent: Element) {}

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		if (!this.listenersBound) {
			window.addEventListener("focus", this.boundRerender);
			window.addEventListener("blur", this.boundRerender);
			this.reduceMotion.addEventListener("change", this.boundRerender);
			this.listenersBound = true;
		}

		this.lastProps = props;
		const { user } = props;
		if (!user.bio) {
			return removeElement(this.parent, this.elements.section);
		}
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		const newMarkdown = document.createElement("div");

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.section, ["class"]);
		clearUnexpectedAttributes(this.elements.title, ["class"]);

		// ? Set the class of the elements
		setClasses(this.elements.section, {
			duc_section: true,
		});
		setClasses(this.elements.title, {
			duc_section_title: true,
		});
		setClasses(newMarkdown, {
			duc_section_text: true,
			duc_markdown: true,
		});

		// ? Set the text of the title element
		this.elements.title.textContent = "About Me";

		// ? Generate the HTML for the bio
		newMarkdown.innerHTML = toHTML(user.bio);
		renderElement(this.elements.markdown, newMarkdown);

		const interval = rerenderInterval(user.bio);
		if (interval)
			this.timeout = setTimeout(() => this.render(props), interval);

		// ? Render the elements
		addElement(this.parent, this.elements.section);
		addElement(this.elements.section, this.elements.title);
		addElement(this.elements.section, this.elements.markdown);
	}

	renderSkeleton(props: Required<DiscordUserCardProperties>): void {
		if (this.listenersBound) {
			window.removeEventListener("focus", this.boundRerender);
			window.removeEventListener("blur", this.boundRerender);
			this.reduceMotion.removeEventListener("change", this.boundRerender);
			this.listenersBound = false;
		}

		this.lastProps = props;
		const { user } = props;
		if (!user.bio) {
			return removeElement(this.parent, this.elements.section);
		}
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		const newMarkdown = document.createElement("div");

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.section, ["class"]);
		clearUnexpectedAttributes(this.elements.title, ["class"]);

		// ? Set the class of the elements
		const titlePill = document.createElement("span");
		setClasses(this.elements.section, {
			duc_section: true,
		});
		setClasses(this.elements.title, {
			duc_section_title: true,
		});
		setClasses(titlePill, {
			duc_skeleton_pill: true,
		});
		setClasses(newMarkdown, {
			duc_section_text: true,
			duc_markdown: true,
		});

		// ? Generate the HTML for the bio
		newMarkdown.innerHTML = toHTML(user.bio);
		renderElement(this.elements.markdown, newMarkdown);

		// ? Render the elements
		addElement(this.parent, this.elements.section);
		addElement(this.elements.section, this.elements.title);
		addElement(this.elements.title, titlePill);
		addElement(this.elements.section, this.elements.markdown);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.section);
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
		window.removeEventListener("focus", this.boundRerender);
		window.removeEventListener("blur", this.boundRerender);
		this.reduceMotion.removeEventListener("change", this.boundRerender);
	}
}
