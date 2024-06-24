/* eslint-disable regexp/optimal-quantifier-concatenation */
/* eslint-disable regexp/no-super-linear-backtracking */
/* eslint-disable regexp/no-useless-non-capturing-group */
import { type SingleASTNode, defaultRules, htmlTag } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";

const BLOCK_END = /\n{2,}$/;
const LIST_LOOKBEHIND = /(?:^|\n)( *)$/;
const LIST_LINE_CHARS = "(?:[*-]|\\d+\\.)";
const LIST_LINE = `( *)(${LIST_LINE_CHARS}) +`;
const LIST_START = RegExp(`^${LIST_LINE}`);
const LIST_ITEM = RegExp(`${LIST_LINE}[^\\n]*(?:\\n(?!\\1${LIST_LINE_CHARS} )[^\\n]*)*(\n|$)`, "gm");
const LIST_ITEM_END_OF_LINE = / *\n$/;
const LIST_CONTENT = RegExp(`^( *)(${LIST_LINE_CHARS}) [\\s\\S]+?(?:\\n(?! )(?!\\1${LIST_LINE_CHARS} )|$)`);
const WHITESPACE = /^[ \t\v\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+$/;
function sanitizeTextContent(elements: Array<SingleASTNode>) {
	return elements.map((element) => {
		if (element.type === "text" && element.content !== null) {
			element.content = element.content.replace(/\n+\s*$/, "");
		}
		return element;
	});
}

export const list: Rule = {
	order: defaultRules.strong.order + 1,
	match: (source, state) => {
		if (state._listLevel >= 11)
			return null;
		const prevCaptureStr = state.prevCapture === null ? "" : state.prevCapture[0];
		const isStartOfLineCapture = LIST_LOOKBEHIND.exec(prevCaptureStr);
		return isStartOfLineCapture === null || WHITESPACE.test(isStartOfLineCapture[0]) ? null : LIST_CONTENT.exec(source);
	},
	parse: (capture, parse, state) => {
		const bullet = capture[2]!;
		const ordered = bullet.length > 1;
		const start = ordered ? Math.min(1e9, Math.max(1, +bullet)) : null;
		const items = capture[0]!.replace(BLOCK_END, "\n").match(LIST_ITEM);

		if (items === null)
			throw new Error("markup list items can not be parsed.");
		let multiLine = !1;
		return {
			ordered,
			start,
			items: items.map((item, index) => {
				let r;
				const start = LIST_START.exec(item);
				const indentationRegExp = RegExp(`^ {1,${start != null ? start[0].length : 0}}`, "gm");
				const strippedLine = item.replace(indentationRegExp, "").replace(LIST_START, "");
				const isLastItem = index === items.length - 1;
				const isMultiline = strippedLine.includes("\n\n") || isLastItem && multiLine;
				multiLine = isMultiline;
				const inline = state.inline;
				const list = state._list;
				const listLevel = state._listLevel;
				state._list = true;
				state._listLevel = (listLevel !== null ? listLevel : 0) + 1;
				if (isMultiline) {
					state.inline = false;
					r = strippedLine.replace(LIST_ITEM_END_OF_LINE, "\n\n");
				}
				else {
					state.inline = true;
					r = strippedLine.replace(LIST_ITEM_END_OF_LINE, "");
				}
				const parsedText = sanitizeTextContent(parse(r, {
					...state,
					allowHeading: !1,
				}));
				state.inline = inline;
				state._list = list;
				state._listLevel = listLevel;
				return parsedText;
			},
			),
		};
	},
	html: (node, output, state) => {
		const tagName = node.ordered ? "ol" : "ul";
		const totalCharacters = node.start !== null ? (node.start + (node.items.length - 1)).toString().length : null;
		return htmlTag(tagName, (node.items as SingleASTNode[]).map((item) => {
			const innerSpan = htmlTag("span", output(item, state));
			return htmlTag("li", innerSpan);
		}, state).join(""), {
			start: node.start,
			style: totalCharacters ? `--totalCharacters: ${totalCharacters};` : "",
		});
	},
};
