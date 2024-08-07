import { setupDiscordUserCard } from "./renderers/index.js";

export {
	ActivityType,
	type DiscordUserCardActivity,
	type DiscordUserCardActivityAssets,
	type DiscordUserCardActivityBase,
	type DiscordUserCardActivityButton,
	type DiscordUserCardActivityButtons,
	type DiscordUserCardActivityCompeting,
	type DiscordUserCardActivityCustom,
	type DiscordUserCardActivityListening,
	type DiscordUserCardActivityPlaying,
	type DiscordUserCardActivityStreaming,
	type DiscordUserCardActivityTimestamps,
	type DiscordUserCardActivityWatching,
	DiscordUserCardBadges,
	DiscordUserCardBotBadges,
	type DiscordUserCardProperties,
	type DiscordUserCardUser,
	PresenceUpdateStatus,
	type Snowflake,
	defaultUserCardProperties,
	flagsToBadges,
} from "@discord-user-card/core";
export { setupDiscordUserCard } from "./renderers/index.js";
export type { Renderer } from "./functions/Renderer.js";
export default setupDiscordUserCard;
