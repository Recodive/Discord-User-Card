import { defaultRules } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

export const autolink: Rule = extendRule(
	{
		parse: (capture) => {
			return {
				type: "text",
				content: capture[1],
			};
		},
	},
	defaultRules.autolink,
);
