import { defaultRules, htmlTag } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";

const everyoneRegex = /^@everyone/;

export const everyone: Rule = {
	order: defaultRules.strong.order,
	match: source => everyoneRegex.exec(source),
	parse: () => ({}),
	html: () => htmlTag("span", htmlTag("span", "@everyone"), { class: "duc_role_mention" }),
};
