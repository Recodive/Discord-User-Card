import process from "node:process";
import twemoji from "twemoji";
import type { Category, Emoji } from "./types.js";

const specialCharacters = new Set([
	"™",
	"™️",
	"\xA9",
	"\xA9️",
	"\xAE",
	"\xAE️",
]);
export class UnicodeEmoji {
	constructor(public emoji: Emoji, public category: Category) {}

	getDiscordURL(svgMap: Record<string, string>): string | undefined {
		const emoji = this.emoji.surrogates;
		if (specialCharacters.has(emoji))
			return;

		const processedEmoji = this.processedSurrogates;

		const foundInMap
			= svgMap[`./${twemoji.convert.toCodePoint(processedEmoji)}.svg`];

		if (!foundInMap) {
			console.error(
				`Failed to find emoji for ${processedEmoji} / ${twemoji.convert.toCodePoint(
					processedEmoji,
				)} (${this.emoji.names.join(", ")})`,
			);
			process.exit(1);
		}

		return `https://discord.com/assets/${foundInMap}`;
	}

	get processedSurrogates() {
		return !this.emoji.surrogates.includes("‍")
			? this.emoji.surrogates.replace("️", "")
			: this.emoji.surrogates;
	}

	get diversityChildrenArray() {
		if (!this.emoji.diversityChildren)
			return [];
		return this.emoji.diversityChildren
			.filter(child => !!child.diversity)
			.map(child => new UnicodeEmoji(child, this.category));
	}
}
