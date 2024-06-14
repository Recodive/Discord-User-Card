import { defaultRules } from "simple-markdown";

import type { Rule } from "../functions/extendRule.js";

const emoticonRegex = /^(¯\\_\(ツ\)_\/¯)/;

export const emoticon: Rule = {
	order: defaultRules.text.order,
	match: source => emoticonRegex.exec(source),
	parse(capture) {
		return {
			type: "text",
			content: capture[1],
		};
	},
	html: defaultRules.text.html,
};
