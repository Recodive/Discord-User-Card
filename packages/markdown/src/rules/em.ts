import { defaultRules } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

export const em: Rule = extendRule(
	{
		parse(capture, parse, state) {
			const parsed = defaultRules.em.parse(
				capture,
				parse,
				Object.assign({}, state, { inEmphasis: true }),
			);

			return state.inEmphasis ? parsed.content : parsed;
		},
	},
	defaultRules.em,
);
