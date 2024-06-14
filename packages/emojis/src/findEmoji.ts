import { type Emoji, emojis } from "./emojis.js";

export function findEmoji(emoji: string): Emoji | undefined {
	return emojis.find(
		e =>
			e.surrogates.includes(emoji) || e.names.includes(emoji),
	);
}
