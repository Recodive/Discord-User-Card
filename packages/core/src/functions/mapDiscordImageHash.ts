import type { DiscordUserCardImage } from "../types/generic.js";

/**
 * Maps a Discord image hash to a user card image
 */
export function mapDiscordImageHash(hash?: string | null): DiscordUserCardImage | undefined {
	if (!hash) return undefined;
	const animated = hash.startsWith("a_");
	return {
		animated,
		id: animated ? hash.slice(2) : hash,
	};
}
