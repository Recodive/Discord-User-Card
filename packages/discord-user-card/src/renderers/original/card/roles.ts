import { ColorUtils, type DiscordUserCardProperties, type DiscordUserCardRole, imageToUrl } from "@discord-user-card/core";
import { findEmoji } from "@discord-user-card/emojis";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, destoryChildren, removeElement, setClasses } from "../../util.js";

export class RolesRenderer implements Renderer {
	elements = {
		section: document.createElement("div"),
		title: document.createElement("h2"),
		roles: document.createElement("div"),
	};

	children: {
		[position: string]: RoleRenderer;
	} = {};

	constructor(public readonly parent: Element) { }

	async render(props: Required<DiscordUserCardProperties>): Promise<void> {
		const { user: { roles } } = props;
		if (!roles?.length) {
			return removeElement(this.parent, this.elements.section);
		}

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.section, ["class"]);
		clearUnexpectedAttributes(this.elements.title, ["class"]);
		clearUnexpectedAttributes(this.elements.roles, ["class", "role", "tabindex"]);

		// ? Set the class of the elements
		setClasses(this.elements.section, {
			duc_section: true,
		});
		setClasses(this.elements.title, {
			duc_section_title: true,
		});
		setClasses(this.elements.roles, {
			duc_roles: true,
		});

		// ? Set the text of the title element
		this.elements.title.textContent = "Roles";

		// ? Set some attributes of the roles element
		this.elements.roles.setAttribute("role", "list");
		this.elements.roles.setAttribute("tabindex", "0");

		// ? Render the elements
		addElement(this.parent, this.elements.section);
		addElement(this.elements.section, this.elements.title);
		addElement(this.elements.section, this.elements.roles);

		// ? Sort the roles by position (highest to lowest)
		const orderedRoles = roles.sort((a, b) => b.position - a.position);

		// ? Render the roles
		for (const [index, role] of orderedRoles.entries()) {
			if (!this.children[index]) {
				this.children[index] = new RoleRenderer(this.elements.roles);
			}
			await this.children[index].render(role);
		}

		// ? Remove any extra roles
		for (let i = orderedRoles.length; i < Object.keys(this.children).length; i++) {
			const index = i.toString();
			this.children[index]?.destroy();
			delete this.children[index];
		}
	}

	destroy(): void {
		removeElement(this.parent, this.elements.section);
		destoryChildren(this.children);
	}
}

class RoleRenderer implements Renderer<DiscordUserCardRole> {
	elements = {
		role: document.createElement("div"),
		circle: document.createElement("span"),
		img: document.createElement("img"),
		nameContainer: document.createElement("div"),
		name: document.createElement("div"),
	};

	constructor(public readonly parent: Element) { }

	async render(props: DiscordUserCardRole): Promise<void> {
		const { id, name, color, icon, emoji } = props;

		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.role, ["class", "role", "tabindex"]);
		clearUnexpectedAttributes(this.elements.circle, ["class", "style"]);
		clearUnexpectedAttributes(this.elements.img, ["class", "src", "alt"]);
		clearUnexpectedAttributes(this.elements.nameContainer, ["class"]);
		clearUnexpectedAttributes(this.elements.name, ["class"]);

		// ? Set the attributes of the elements
		setClasses(this.elements.role, {
			duc_role: true,
		});
		this.elements.role.setAttribute("role", "listitem");
		this.elements.role.setAttribute("tabindex", "-1");

		setClasses(this.elements.circle, {
			duc_role_circle: true,
		});
		if (color === 0) {
			this.elements.circle.style.backgroundColor = "rgb(196, 201, 206)";
		}
		else {
			const [r, g, b] = ColorUtils.intToRgb(color);
			this.elements.circle.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
		}

		setClasses(this.elements.img, {
			duc_role_icon: true,
		});
		if (icon) {
			this.elements.img.src = `${imageToUrl({
				image: icon,
				scope: "role-icons",
				animation: false,
				relatedId: id,
			})}?size=16&quality=lossless`;
			this.elements.img.alt = `Role Icon, ${name}`;
		}
		if (emoji) {
			const foundEmoji = findEmoji(emoji);
			if (foundEmoji) {
				this.elements.img.src = foundEmoji.asset;
				this.elements.img.alt = `:${foundEmoji.names[0]}:`;
			}
		}

		setClasses(this.elements.nameContainer, {
			duc_role_name_container: true,
		});

		setClasses(this.elements.name, {
			duc_role_name: true,
		});
		this.elements.name.textContent = name;

		// ? Render the elements
		addElement(this.parent, this.elements.role);
		addElement(this.elements.role, this.elements.circle);
		if (icon || emoji) {
			addElement(this.elements.role, this.elements.img);
		}
		else {
			removeElement(this.elements.role, this.elements.img);
		}
		addElement(this.elements.role, this.elements.nameContainer);
		addElement(this.elements.nameContainer, this.elements.name);
	}

	destroy(): void {
		removeElement(this.parent, this.elements.role);
	}
}
