import { defaultRules, htmlTag } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";

const channelRegex = /^<#(\d{17,20})>/;
const hashtag = `
	<svg class="duc_channel_icon" aria-label="Channel" aria-hidden="false" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">
		<path fill="currentColor" fill-rule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clip-rule="evenodd"></path>
	</svg>
`;

export const channel: Rule = {
	order: defaultRules.strong.order,
	match: source => channelRegex.exec(source),
	parse(capture) {
		return {
			id: capture[1],
		};
	},
	html: (node) => {
		return htmlTag(
			"span",
			htmlTag("span", hashtag, { class: "duc_nowrap" }) + htmlTag("span", node.id, { class: "duc_channel_name" }),
			{ class: "duc_channel" },
		);
	},
};
