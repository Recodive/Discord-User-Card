import type { HtmlArrayRule } from "simple-markdown";
import { defaultRules, outputFor, parserFor } from "simple-markdown";
import type { Rule } from "./functions/extendRule.js";
import { autolink } from "./rules/autolink.js";
import { blockQuote } from "./rules/blockQuote.js";
import { br } from "./rules/br.js";
import { channel } from "./rules/channel.js";
import { codeBlock } from "./rules/codeBlock.js";
import { em } from "./rules/em.js";
import { emoji } from "./rules/emoji.js";
import { emoticon } from "./rules/emoticon.js";
import { escape } from "./rules/escape.js";
import { everyone } from "./rules/everyone.js";
import { heading } from "./rules/heading.js";
import { here } from "./rules/here.js";
import { inlineCode } from "./rules/inlineCode.js";
import { link } from "./rules/link.js";
import { newline } from "./rules/newline.js";
import { role } from "./rules/role.js";
import { spoiler } from "./rules/spoiler.js";
import { strikethrough } from "./rules/strikethrough.js";
import { strong } from "./rules/strong.js";
import { text } from "./rules/text.js";
import { timestamp } from "./rules/timestamp.js";
import { twemoji } from "./rules/twemoji.js";
import { underline } from "./rules/underline.js";
import { url } from "./rules/url.js";
import { user } from "./rules/user.js";
// export type { Rule } from "./functions/extendRule.js";

export const rules = {
	autolink,
	blockQuote,
	br,
	channel,
	codeBlock,
	em,
	emoji,
	emoticon,
	escape,
	everyone,
	heading,
	here,
	inlineCode,
	link,
	newline,
	role,
	spoiler,
	strikethrough,
	strong,
	text,
	timestamp,
	twemoji,
	underline,
	url,
	user,
	Array: {
		html: defaultRules.Array.html,
		rerenderInterval(arr, output, state) {
			const result: (number | undefined)[] = [];

			// map output over the ast, except group any text
			// nodes together into a single string output.
			for (let i = 0; i < arr.length; i++) {
				let node = arr[i]!;
				if (node.type === "text") {
					node = { type: "text", content: node.content };
					for (; i + 1 < arr.length && arr[i + 1]!.type === "text"; i++) {
						node.content += arr[i + 1]!.content;
					}
				}

				if (rules[node.type as keyof typeof rules]?.rerenderInterval)
					result.push(output(node, state));
			}

			const nonUndefined = result.filter((x): x is number => x !== undefined);
			if (nonUndefined.length === 0)
				return undefined;
			return Math.min(...nonUndefined);
		},
	},
} satisfies {
	[key: string]: Rule | HtmlArrayRule;
	Array: HtmlArrayRule;
};

export interface SingleASTNode {
	type: RuleType;
	[prop: string]: any;
}

export function parseMarkdown(markdown: string): SingleASTNode[] {
	return parserFor(rules)(markdown, { inline: true }) as SingleASTNode[];
}

export function toHTML(markdown: string): string {
	return outputFor(rules, "html")(parseMarkdown(markdown));
}

export function rerenderInterval(markdown: string): number | undefined {
	return outputFor(rules, "rerenderInterval")(parseMarkdown(markdown));
}

export type RuleType = keyof typeof rules;
