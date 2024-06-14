import { defaultRules, htmlTag } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";

const roleMentionRegex = /^<@&(\d{17,20})>/;

export const role: Rule = {
	order: defaultRules.strong.order,
	match: source => roleMentionRegex.exec(source),
	parse(capture) {
		return {
			id: capture[1],
		};
	},
	html: node =>
		htmlTag("span", htmlTag("span", `@${node.id}`), {
			class: "duc_role_mention",
		}),
};
