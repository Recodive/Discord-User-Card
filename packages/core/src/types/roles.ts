import type { Snowflake } from "./discordApiTypes.js";

export interface DiscordUserCardRole {
	/**
	 * ID of the role
	 */
	id: Snowflake;
	/**
	 * Name of the role
	 */
	name: string;
	/**
	 * The role's color as an integer representation of a hexadecimal color code
	 */
	color: number;
	/**
	 * The role's icon hash
	 */
	icon?: string;
	/**
	 * The role's unicode emoji as a standard emoji
	 */
	emoji?: string;
	/**
	 * Position of the role
	 */
	position: number;
}
