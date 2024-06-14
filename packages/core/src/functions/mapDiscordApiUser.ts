import { type APIUser, UserPremiumType } from "../types/discordApiTypes.js";

import {
	DiscordUserCardBadges,
	type DiscordUserCardBotBadges,
	type DiscordUserCardProperties,
} from "../types/index.js";
import { flagsToBadges } from "./badges.js";
import { mapDiscordImageHash } from "./mapDiscordImageHash.js";

/**
 * Maps a Discord API user to a user card
 */
export function mapDiscordApiUser(user: APIUser): DiscordUserCardProperties {
	const {
		id,
		username,
		discriminator,
		avatar,
		bot,
		system,
		banner,
		accent_color: bannerColor,
		flags,
		premium_type: premiumType,
		avatar_decoration_data: avatarDecoration,
	} = user;
	const badges: (DiscordUserCardBadges | DiscordUserCardBotBadges)[] = [];
	if (premiumType !== undefined && premiumType !== UserPremiumType.None)
		badges.push(DiscordUserCardBadges.PREMIUM);
	if (flags !== undefined)
		badges.push(...flagsToBadges(flags, bot));

	return {
		user: {
			avatar: mapDiscordImageHash(avatar),
			avatarDecoration: mapDiscordImageHash(avatarDecoration?.asset),
			banner: mapDiscordImageHash(banner),
			bannerColor: bannerColor ?? undefined,
			app: bot,
			discriminator,
			badges,
			id,
			system,
			username,
		},
	};
}
