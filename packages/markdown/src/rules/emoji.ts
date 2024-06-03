import { defaultRules, htmlTag } from "simple-markdown";
import { imageToUrl } from "@discord-user-card/core";
import type { Rule } from "../functions/extendRule.js";

const emojiRegex = /^<(a)?:(\w{2,32}):(\d{17,21})>/;

export const emoji: Rule = {
	order: defaultRules.strong.order,
	match: source => emojiRegex.exec(source),
	parse(capture) {
		return {
			animated: capture[1] === "a",
			name: capture[2],
			id: capture[3],
		};
	},
	html: (node) => {
		return htmlTag(
			"span",
			htmlTag("img", "", {
				"aria-label": node.name,
				"src": imageToUrl({
					scope: "emojis",
					image: {
						animated: node.animated,
						id: node.id,
					},
				}),
				"alt": node.name,
				"draggable": "false",
				"class": "duc_emoji",
			}),
			{ class: "duc_emoji_container" },
		);
	},
};
