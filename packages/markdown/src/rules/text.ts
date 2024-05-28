import { anyScopeRegex, defaultRules } from "simple-markdown";
import { extendRule, type Rule } from "../functions/extendRule.js";

const textRegex = /^[\s\S]+?(?=[^0-9A-Za-z\s]|\n\n|\n|\w+:\S|$)/;

export const text: Rule = extendRule(
	{
		match: anyScopeRegex(textRegex),
	},
	defaultRules.text
);
