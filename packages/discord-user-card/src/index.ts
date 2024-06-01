import { setupDiscordUserCard } from "./html/index.js";

export {
	ActivityType,
	type APIUser,
	type APIAvatarDecorationData,
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
	type DiscordUserCardImage,
	type DiscordUserCardProperties,
	type DiscordUserCardUser,
	PresenceUpdateStatus,
	type Snowflake,
	UserFlags,
	UserPremiumType,
	defaultUserCardProperties,
	mapDiscordApiUser,
	flagsToBadges,
} from "@discord-user-card/core";
export { setupDiscordUserCard } from "./html/index.js";
export { setupOriginalDiscordUserCard } from "./html/original/index.js";
export { type RenderFunction } from "./html/util.js";
export default setupDiscordUserCard;
