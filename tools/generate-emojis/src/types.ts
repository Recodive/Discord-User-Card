import { scope } from "arktype";

export const types = scope({
	emoji: {
		names: "string[]",
		surrogates: "string",
		unicodeVersion: "number",
		"hasDiversity?": "boolean",
		"diversity?": "string[]",
		"diversityChildren?": "emoji[]",
		"hasMultiDiversity?": "boolean",
		"hasDiversityParent?": "boolean",
		"hasMultiDiversityParent?": "boolean",
	},
	finalEmoji: {
		category: "string",
		names: "string[]",
		surrogates: "string[]",
		asset: "string",
	},
	emojiList: {
		"[string]": "emoji[]",
		"+": "reject",
	},
	svgPath: /^\.\/[\dabcdef]+(-[\dabcdef]+)*\.svg$/,
	svgMap: {
		"[svgPath]": "digits>0",
		"+": "reject",
	},
}).export();

export type Emoji = typeof types.emoji.infer;
export type FinalEmoji = typeof types.finalEmoji.infer;
