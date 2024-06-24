import { defaultRules, htmlTag, inlineRegex } from "simple-markdown";
import hljs from "highlight.js";
import type { Rule } from "../functions/extendRule.js";

// eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/prefer-w, regexp/no-useless-lazy, regexp/match-any
const codeBlockRegex = /^```(?:([a-z0-9_+\-.#]+?)\n)?\n*([^\n][^]*?)\n*```/i;

export const codeBlock: Rule = {
	match: inlineRegex(codeBlockRegex),
	parse(capture, _parse, state) {
		return {
			lang: (capture[1] || "").trim(),
			content: capture[2] || "",
			inQuote: state.inQuote || false,
		};
	},
	order: defaultRules.codeBlock.order,
	html(node) {
		const unknownLang = () => htmlTag(
			"pre",
			htmlTag("code", node.content, { class: "hljs duc_scrollbar_ghost_hairline" }),
		);

		if (!node.lang || !hljs.getLanguage(node.lang) || typeof node.content !== "string") {
			return unknownLang();
		}

		const result = hljs.highlight(node.lang, node.content, true);
		if (!result)
			return unknownLang();

		return htmlTag(
			"pre",
			htmlTag("code", result.value, { class: `hljs duc_scrollbar_ghost_hairline ${result.language}` }),
		);
	},
};
