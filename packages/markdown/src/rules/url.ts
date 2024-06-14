import { defaultRules } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

export const url: Rule = extendRule(
	{
		parse: (capture) => {
			return {
				content: [
					{
						type: "text",
						content: capture[1],
					},
				],
				target: capture[1],
			};
		},
	},
	defaultRules.url,
);
