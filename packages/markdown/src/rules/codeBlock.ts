import { defaultRules, inlineRegex } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

// eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/no-misleading-capturing-group, regexp/optimal-quantifier-concatenation
const codeBlockRegex = /^```(([a-z0-9-]+)\n+)?\n*([\s\S]+?)\n*```/i;

export const codeBlock: Rule = extendRule(
	{
		match: inlineRegex(codeBlockRegex),
		parse(capture, _parse, state) {
			return {
				lang: (capture[2] || "").trim(),
				content: capture[3] || "",
				inQuote: state.inQuote || false,
			};
		},
	},
	defaultRules.codeBlock,
);
