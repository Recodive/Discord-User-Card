import { defaultUserCardProperties } from "@discord-user-card/core";
import type { Renderer, RendererType } from "../functions/Renderer.js";
import { OriginalDiscordUserCard } from "./original/index.js";

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
	},
): RendererType {
	// ? Make sure the element is not null, and that it is a div
	if (!element || element.tagName !== "DIV")
		throw new Error("Invalid element");

	let renderer: Renderer;
	switch (style) {
		case "original": {
			switch (type) {
				case "card":
					renderer = new OriginalDiscordUserCard(element);
					break;
				default:
					throw new Error(`Invalid type "${type}"`);
			}
			break;
		}
		default:
			throw new Error(`Invalid style "${style}"`);
	}

	return {
		render: async (props) => {
			const { activities, user } = {
				...defaultUserCardProperties,
				...props,
			};
			await renderer.render({
				activities,
				user,
			});
		},
		destroy: renderer.destroy,
	};
}
