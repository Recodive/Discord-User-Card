/**
 * The following types are copied from the discord-api-types package.
 * All credit goes to the original authors.
 */

/**
 * https://discord.com/developers/docs/reference#snowflakes
 */
export type Snowflake = string;

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
	/**
	 * Right now, I'm -
	 */
	Hang = 6,
}
