const DISCORD_EPOCH = 1420070400000;

/**
 * Convert a user ID to a Unix timestamp.
 * @param userId The user ID to convert.
 * @returns The Unix timestamp.
 */
export function userIdToTimestamp(userId: string): number {
	return Number(BigInt(userId) >> 22n) + DISCORD_EPOCH;
}
