import { DiscordUserCardProperties } from "@discord-user-card/core";
import { setupOriginalDiscordUserCard } from "./original/index.js";

export function setupDiscordUserCard(
	element: HTMLDivElement,
	{
		style,
		type,
	}: {
		style: "original"; // implement the new style
		type: "card"; // "card" | "profile"
	} = {
		style: "original",
		type: "card",
	}
): {
	render: (props: DiscordUserCardProperties) => Promise<void>;
} {
	//? Make sure the element is not null, and that it is a div
	if (!element || element.tagName !== "DIV") throw new Error("Invalid element");

	switch (style) {
		case "original": {
			switch (type) {
				case "card":
					return setupOriginalDiscordUserCard(element);

				default:
					throw new Error(`Invalid type "${type}"`);
			}
		}
		default:
			throw new Error(`Invalid style "${style}"`);
	}
}
