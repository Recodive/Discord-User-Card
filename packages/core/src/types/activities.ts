import type { ActivityType } from "./discordApiTypes.js";

import { DiscordUserCardImage } from "./generic.js";

export type DiscordUserCardActivity =
	| DiscordUserCardActivityPlaying
	| DiscordUserCardActivityStreaming
	| DiscordUserCardActivityListening
	| DiscordUserCardActivityWatching
	| DiscordUserCardActivityCompeting
	| DiscordUserCardActivityCustom;

export interface DiscordUserCardActivityBase {
	/**
	 * The type of activity
	 */
	type: ActivityType;
	/**
	 * The name of the activity
	 */
	name: string;
}

export interface DiscordUserCardActivityTimestamps {
	/**
	 * Unix time (in milliseconds) of when the activity started
	 */
	startTimestamp?: number;
	/**
	 * Unix time (in milliseconds) of when the activity ends
	 */
	endTimestamp?: number;
}

export interface DiscordUserCardActivityAssets {
	/**
	 * The large image asset ID
	 */
	largeImage?: string;
	/**
	 * The large image text
	 */
	largeImageText?: string;
	/**
	 * The small image asset ID
	 */
	smallImage?: string;
	/**
	 * The small image text
	 */
	smallImageText?: string;
}

export interface DiscordUserCardActivityButtons {
	/**
	 * Buttons to show on the activity
	 */
	buttons?:
		| [DiscordUserCardActivityButton]
		| [DiscordUserCardActivityButton, DiscordUserCardActivityButton];
}

export interface DiscordUserCardActivityButton {
	/**
	 * The label shown on the first button
	 */
	label: string;
	/**
	 * The URL the first button links to
	 */
	url: string;
}

export interface DiscordUserCardActivityPlaying
	extends DiscordUserCardActivityBase,
		DiscordUserCardActivityTimestamps,
		DiscordUserCardActivityAssets,
		DiscordUserCardActivityButtons {
	/**
	 * The type of activity
	 */
	type: ActivityType.Playing;
	/**
	 * The application ID of the game
	 */
	applicationId?: string;
	/**
	 * The details of the game
	 */
	details?: string;
	/**
	 * The state of the game
	 */
	state?: string;
}

export interface DiscordUserCardActivityStreaming
	extends DiscordUserCardActivityBase,
		DiscordUserCardActivityTimestamps,
		DiscordUserCardActivityAssets,
		DiscordUserCardActivityButtons {
	/**
	 * The type of activity
	 */
	type: ActivityType.Streaming;
	/**
	 * The URL of the stream
	 */
	url?: string;
	/**
	 * The application ID of the stream
	 */
	applicationId?: string;
	/**
	 * The details of the stream
	 */
	details?: string;
	/**
	 * The state of the stream
	 */
	state?: string;
}

export interface DiscordUserCardActivityListening
	extends DiscordUserCardActivityBase,
		DiscordUserCardActivityTimestamps,
		DiscordUserCardActivityAssets,
		DiscordUserCardActivityButtons {
	/**
	 * The type of activity
	 */
	type: ActivityType.Listening;
	/**
	 * The application ID of the song
	 */
	applicationId?: string;
	/**
	 * The details of the song
	 */
	details?: string;
	/**
	 * The state of the song
	 */
	state?: string;
}

export interface DiscordUserCardActivityWatching
	extends DiscordUserCardActivityBase,
		DiscordUserCardActivityTimestamps,
		DiscordUserCardActivityAssets,
		DiscordUserCardActivityButtons {
	/**
	 * The type of activity
	 */
	type: ActivityType.Watching;
	/**
	 * The application ID of the video
	 */
	applicationId?: string;
	/**
	 * The details of the video
	 */
	details?: string;
	/**
	 * The state of the video
	 */
	state?: string;
}

export interface DiscordUserCardActivityCompeting
	extends DiscordUserCardActivityBase,
		DiscordUserCardActivityTimestamps,
		DiscordUserCardActivityAssets,
		DiscordUserCardActivityButtons {
	/**
	 * The type of activity
	 */
	type: ActivityType.Competing;
	/**
	 * The application ID of the competition
	 */
	applicationId?: string;
	/**
	 * The details of the competition
	 */
	details?: string;
	/**
	 * The state of the competition
	 */
	state?: string;
}

export interface DiscordUserCardActivityCustom
	extends DiscordUserCardActivityBase {
	/**
	 * The type of activity
	 */
	type: ActivityType.Custom;
	/**
	 * Emoji that appears infront of the activity
	 */
	emoji?: { name: string } | (DiscordUserCardImage & { name: string });
	/**
	 * Text that appears after the emoji in the activity
	 */
	state?: string;
}
