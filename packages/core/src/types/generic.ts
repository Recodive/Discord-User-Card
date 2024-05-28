import type { Snowflake } from "discord-api-types/globals";

export interface DiscordUserCardImage {
	/**
	 * The ID of the image
	 * @example "6170487d32fdfe9f988720ad80e6ab8c"
	 * Do not include the `a_` prefix for animated images, as this is determined by the `animated` property
	 */
	id: Snowflake;
	/**
	 * Whether the image is animated
	 */
	animated: boolean;
}

export type DiscordImageScope = "emojis" | "banners" | "avatars" | "avatar-decoration-presets" | "app-icons" | "app-assets";
