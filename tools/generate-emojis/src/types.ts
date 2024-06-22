import { scope } from "arktype";

export const types = scope({
	emoji: {
		"names": "string[]",
		"surrogates": "string",
		"unicodeVersion": "number",
		"hasDiversity?": "boolean",
		"diversity?": "string[]",
		"diversityChildren?": "emoji[]",
		"hasMultiDiversity?": "boolean",
		"hasDiversityParent?": "boolean",
		"hasMultiDiversityParent?": "boolean",
	},
	finalEmoji: {
		category: "category",
		names: "string[]",
		surrogates: "string[]",
		asset: "string",
	},
	emojiList: {
		"[category]": "emoji[]",
		"+": "reject",
	},
	svgPath: /^\.\/[\da-f]+(-[\da-f]+)*\.svg$/,
	svgMap: {
		"[svgPath]": "digits>0",
		"+": "reject",
	},
	category: "\"people\" | \"nature\" | \"food\" | \"activity\" | \"travel\" | \"objects\" | \"symbols\" | \"flags\"",
}).export();

export type Emoji = typeof types.emoji.infer;
export type FinalEmoji = typeof types.finalEmoji.infer;
export type Category = typeof types.category.infer;
