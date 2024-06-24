import { htmlTag } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";

const spoilerRegex = /^\|\|([\s\S]+?)\|\|/;

export const spoiler: Rule = {
	order: 0,
	match: source => spoilerRegex.exec(source),
	parse(capture, parse, state) {
		return {
			content: parse(capture[1] || "", state),
		};
	},
	html: (node, output, state) => {
		return htmlTag(
			"span",
			htmlTag(
				"span",
				htmlTag("span", output(node.content, state), {
					"class": "duc_spoiler_content",
					"aria-hidden": "true",
				}),
				{ class: "duc_spoiler_obscured" },
			),
			{
				"class": "duc_spoiler_container",
				"aria-expanded": "false",
				"role": "button",
				"tabindex": "0",
				"onclick": "this.setAttribute('aria-expanded', 'true'); this.querySelector('.duc_spoiler_content').setAttribute('aria-hidden', 'false');",
			},
		);
	},
};
