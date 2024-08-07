import { defaultRules, htmlTag, inlineRegex } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

const strikeThroughRegex = /^~~([\s\S]+?)~~(?!_)/;

export const strikethrough: Rule = extendRule(
	{
		match: inlineRegex(strikeThroughRegex),
		html: (node, output, state) => htmlTag("s", output(node.content, state)),
	},
	defaultRules.del,
);
