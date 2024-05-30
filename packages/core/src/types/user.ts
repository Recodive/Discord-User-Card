import type { PresenceUpdateStatus, Snowflake } from "discord-api-types/v10";

import type { DiscordUserCardImage } from "./generic.js";

export { PresenceUpdateStatus } from "discord-api-types/v10";

export interface DiscordUserCardUser {
	/**
	 * The user's id
	 */
	id: Snowflake;
	/**
	 * The user's username, not unique across the platform
	 */
	username: string;
	/**
	 * The user's avatar hash
	 */
	avatar?: DiscordUserCardImage;
	/**
	 * The user's avatar decoration hash
	 */
	avatarDecoration?: DiscordUserCardImage;
	/**
	 * The user's banner hash
	 */
	banner?: DiscordUserCardImage;
	/**
	 * The user's banner color encoded as an integer representation of hexadecimal color code
	 */
	bannerColor?: number;
	/**
	 * The user's bio/about me
	 */
	bio?: string;
	/**
	 * Whether the user belongs to an OAuth2 application
	 */
	app?: boolean;
	/**
	 * The user's Discord-tag
	 */
	discriminator?: string;
	/**
	 * The user's display name, if it is set. For bots, this is the application name
	 */
	displayName?: string;
	/**
	 * The flags on a user's account
	 */
	flags?: number;
	/**
	 * The user's chosen pronouns
	 */
	pronouns?: string;
	/**
	 * The user's status
	 */
	status?: PresenceUpdateStatus;
	/**
	 * Whether the user is an Official Discord System user (part of the urgent message system)
	 */
	system?: boolean;
	/**
	 * The user's profile theme colors
	 */
	themeColors?: {
		/**
		 * The user's primary theme color encoded as an integer representation of hexadecimal color code
		 */
		primary: number;
		/**
		 * The user's secondary theme color encoded as an integer representation of hexadecimal color code
		 */
		secondary: number;
	};
}
