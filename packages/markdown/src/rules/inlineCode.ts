import { defaultRules, htmlTag, sanitizeText } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

export const inlineCode: Rule = extendRule(
	{
		match: source => defaultRules.inlineCode.match.regex!.exec(source),
		html: node =>
			htmlTag("code", sanitizeText(node.content), { class: "duc_inline_code" }),
	},
	defaultRules.inlineCode,
);
