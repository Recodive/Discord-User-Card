import type { APIUser } from "../types/discordApiTypes.js";

import type { DiscordUserCardProperties } from "../types/index.js";
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
		avatar_decoration_data: avatarDecoration,
	} = user;
	return {
		user: {
			avatar: mapDiscordImageHash(avatar),
			avatarDecoration: mapDiscordImageHash(avatarDecoration?.asset),
			banner: mapDiscordImageHash(banner),
			bannerColor: bannerColor ?? undefined,
			app: bot,
			discriminator,
			flags,
			id,
			system,
			username,
		},
	};
}
