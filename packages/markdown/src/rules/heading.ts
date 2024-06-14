import { defaultRules } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

// eslint-disable-next-line regexp/no-super-linear-backtracking
const HeadingRegex = /^(#{1,3}) +([^\n]+)(\n|$)/;

export const heading: Rule = extendRule(
	{
		match(source, state) {
			if (state.prevCapture === null || state.prevCapture[0] === "\n") {
				return HeadingRegex.exec(source);
			}
			return null;
		},
	},
	defaultRules.heading,
);
