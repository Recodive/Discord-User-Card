import { defaultRules, htmlTag } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";

const userMentionRegex = /^<@!?(\d{17,20})>/;

export const user: Rule = {
	order: defaultRules.strong.order,
	match: source => userMentionRegex.exec(source),
	parse(capture) {
		return {
			id: capture[1],
			type: "user",
		};
	},
	html: node =>
		htmlTag("span", htmlTag("span", `@${node.id}`), {
			class: "duc_user_mention",
		}),
};
