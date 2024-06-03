import { anyScopeRegex, defaultRules } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

// eslint-disable-next-line regexp/no-super-linear-backtracking
const textRegex = /^[\s\S]+?(?=[^0-9A-Z\s]|\n\n|\n|\w+:\S|$)/i;

export const text: Rule = extendRule(
	{
		match: anyScopeRegex(textRegex),
	},
	defaultRules.text,
);
