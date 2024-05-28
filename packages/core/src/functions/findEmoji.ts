import { emojis } from "../emojis.js";


export function findEmoji(emoji: string) {
	return emojis.find(
		(e) =>
			e.strings.some((n) => n === emoji)
			|| e.names.some((n) => n === emoji)
	);
}
