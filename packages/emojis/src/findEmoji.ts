import { type Emoji, emojis } from "./emojis.js";

export function findEmoji(emoji: string): Emoji | undefined {
	return emojis.find(
		(e) =>
			e.surrogates.some((n) => n === emoji) || e.names.some((n) => n === emoji)
	);
}
