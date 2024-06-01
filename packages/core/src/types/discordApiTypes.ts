/**
 * The following types are copied from the discord-api-types package.
 * All credit goes to the original authors.
 */

/**
 * https://discord.com/developers/docs/reference#snowflakes
 */
export type Snowflake = string;

/**
 * https://discord.com/developers/docs/resources/user#avatar-decoration-data-object
 */
export interface APIAvatarDecorationData {
	/**
	 * The avatar decoration hash
	 *
	 * See https://discord.com/developers/docs/reference#image-formatting
	 */
	asset: string;
	/**
	 * The id of the avatar decoration's SKU
	 */
	sku_id: Snowflake;
}

/**
 * https://discord.com/developers/docs/resources/user#user-object-premium-types
 */
export enum UserPremiumType {
	None = 0,
	NitroClassic = 1,
	Nitro = 2,
	NitroBasic = 3,
}

/**
 * https://discord.com/developers/docs/resources/user#user-object-user-flags
 */
export enum UserFlags {
	/**
	 * Discord Employee
	 */
	Staff = 1,
	/**
	 * Partnered Server Owner
	 */
	Partner = 2,
	/**
	 * HypeSquad Events Member
	 */
	Hypesquad = 4,
	/**
	 * Bug Hunter Level 1
	 */
	BugHunterLevel1 = 8,
	/**
	 * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 */
	MFASMS = 16,
	/**
	 * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 */
	PremiumPromoDismissed = 32,
	/**
	 * House Bravery Member
	 */
	HypeSquadOnlineHouse1 = 64,
	/**
	 * House Brilliance Member
	 */
	HypeSquadOnlineHouse2 = 128,
	/**
	 * House Balance Member
	 */
	HypeSquadOnlineHouse3 = 256,
	/**
	 * Early Nitro Supporter
	 */
	PremiumEarlySupporter = 512,
	/**
	 * User is a [team](https://discord.com/developers/docs/topics/teams)
	 */
	TeamPseudoUser = 1024,
	/**
	 * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 */
	HasUnreadUrgentMessages = 8192,
	/**
	 * Bug Hunter Level 2
	 */
	BugHunterLevel2 = 16384,
	/**
	 * Verified Bot
	 */
	VerifiedBot = 65536,
	/**
	 * Early Verified Bot Developer
	 */
	VerifiedDeveloper = 131072,
	/**
	 * Moderator Programs Alumni
	 */
	CertifiedModerator = 262144,
	/**
	 * Bot uses only [HTTP interactions](https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction) and is shown in the online member list
	 */
	BotHTTPInteractions = 524288,
	/**
	 * User has been identified as spammer
	 *
	 * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 */
	Spammer = 1048576,
	/**
	 * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 */
	DisablePremium = 2097152,
	/**
	 * User is an [Active Developer](https://support-dev.discord.com/hc/articles/10113997751447)
	 */
	ActiveDeveloper = 4194304,
	/**
	 * User's account has been [quarantined](https://support.discord.com/hc/articles/6461420677527) based on recent activity
	 *
	 * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 * @privateRemarks
	 *
	 * This value would be 1 << 44, but bit shifting above 1 << 30 requires bigints
	 */
	Quarantined = 17592186044416,
	/**
	 * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 * @privateRemarks
	 *
	 * This value would be 1 << 50, but bit shifting above 1 << 30 requires bigints
	 */
	Collaborator = 1125899906842624,
	/**
	 * @unstable This user flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 * @privateRemarks
	 *
	 * This value would be 1 << 51, but bit shifting above 1 << 30 requires bigints
	 */
	RestrictedCollaborator = 2251799813685248,
}

/**
 * https://discord.com/developers/docs/resources/user#user-object
 */
export interface APIUser {
	/**
	 * The user's id
	 */
	id: Snowflake;
	/**
	 * The user's username, not unique across the platform
	 */
	username: string;
	/**
	 * The user's Discord-tag
	 */
	discriminator: string;
	/**
	 * The user's display name, if it is set. For bots, this is the application name
	 */
	global_name: string | null;
	/**
	 * The user's avatar hash
	 *
	 * See https://discord.com/developers/docs/reference#image-formatting
	 */
	avatar: string | null;
	/**
	 * Whether the user belongs to an OAuth2 application
	 */
	bot?: boolean;
	/**
	 * Whether the user is an Official Discord System user (part of the urgent message system)
	 */
	system?: boolean;
	/**
	 * Whether the user has two factor enabled on their account
	 */
	mfa_enabled?: boolean;
	/**
	 * The user's banner hash
	 *
	 * See https://discord.com/developers/docs/reference#image-formatting
	 */
	banner?: string | null;
	/**
	 * The user's banner color encoded as an integer representation of hexadecimal color code
	 */
	accent_color?: number | null;
	/**
	 * The user's chosen language option
	 */
	locale?: string;
	/**
	 * Whether the email on this account has been verified
	 */
	verified?: boolean;
	/**
	 * The user's email
	 */
	email?: string | null;
	/**
	 * The flags on a user's account
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object-user-flags
	 */
	flags?: UserFlags;
	/**
	 * The type of Nitro subscription on a user's account
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object-premium-types
	 */
	premium_type?: UserPremiumType;
	/**
	 * The public flags on a user's account
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object-user-flags
	 */
	public_flags?: UserFlags;
	/**
	 * The user's avatar decoration hash
	 *
	 * See https://discord.com/developers/docs/reference#image-formatting
	 *
	 * @deprecated Use `avatar_decoration_data` instead
	 */
	avatar_decoration?: string | null;
	/**
	 * The data for the user's avatar decoration
	 *
	 * See https://discord.com/developers/docs/resources/user#avatar-decoration-data-object
	 */
	avatar_decoration_data?: APIAvatarDecorationData | null;
}

/**
 * https://discord.com/developers/docs/topics/gateway-events#update-presence-status-types
 */
export enum PresenceUpdateStatus {
	Online = "online",
	DoNotDisturb = "dnd",
	Idle = "idle",
	/**
	 * Invisible and shown as offline
	 */
	Invisible = "invisible",
	Offline = "offline",
}

/**
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
 */
export enum ActivityType {
	/**
	 * Playing {game}
	 */
	Playing = 0,
	/**
	 * Streaming {details}
	 */
	Streaming = 1,
	/**
	 * Listening to {name}
	 */
	Listening = 2,
	/**
	 * Watching {details}
	 */
	Watching = 3,
	/**
	 * {emoji} {state}
	 */
	Custom = 4,
	/**
	 * Competing in {name}
	 */
	Competing = 5,
}
