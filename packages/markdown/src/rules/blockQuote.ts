import { defaultRules, htmlTag } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

const blockQuoteRegex = /^( *>>> ([\s\S]*))|^( *> [^\n]*(\n *> [^\n]*)*\n?)/;

export const blockQuote: Rule = extendRule(
	{
		match(source, state, prevSource) {
			return !/^$|\n *$/.test(prevSource) || state.inQuote ? null : blockQuoteRegex.exec(source);
		},
		parse(capture, parse, state) {
			const all = capture[0] || "";
			const isBlock = Boolean(/^ *>>> ?/.exec(all));
			const removeSyntaxRegex = isBlock ? /^ *>>> ?/ : /^ *> ?/gm;
			const content = all.replace(removeSyntaxRegex, "");

			return {
				content: parse(content, Object.assign({}, state, { inQuote: true })),
				type: "blockQuote",
			};
		},
		html: (node, output, state) => {
			return htmlTag(
				"div",
				htmlTag("div", "", { class: "duc_blockquote_divider" }) + htmlTag("blockquote", output(node.content, state)),
				{ class: "duc_blockquote_container" },
			);
		},
	},
	defaultRules.blockQuote,
);
