import { anyScopeRegex, defaultRules } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

export const br: Rule = extendRule(
	{
		match: anyScopeRegex(/^\n/),
		html: () => "<span>\n</span>",
	},
	defaultRules.br,
);
