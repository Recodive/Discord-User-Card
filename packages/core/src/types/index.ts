import type { DiscordUserCardActivity } from "./activities.js";
import type { DiscordUserCardUser } from "./user.js";

export * from "./activities.js";
export * from "./generic.js";
export * from "./user.js";
export * from "./discordApiTypes.js";
export * from "./badges.js";

export interface DiscordUserCardProperties {
	/**
	 * The user to display
	 * @default Clyde
	 */
	user?: DiscordUserCardUser;
	/**
	 * The activities to display
	 */
	activities?: DiscordUserCardActivity[];
	/**
	 * The theme of the user card
	 *
	 * @default "dark"
	 */
	theme?: "light" | "dark" | "darker" | "midnight";
}
