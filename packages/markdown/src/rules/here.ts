import { defaultRules, htmlTag } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";

const hereRegex = /^@here/;

export const here: Rule = {
	order: defaultRules.strong.order,
	match: source => hereRegex.exec(source),
	parse: () => ({}),
	html: () => htmlTag("span", htmlTag("span", "@here"), { class: "duc_role_mention" }),
};
