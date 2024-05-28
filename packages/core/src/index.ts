import type { DiscordUserCardProperties } from "./types/index.js";

export * from "./functions/index.js";
export * from "./types/index.js";
export * from "./emojis.js";

export const defaultUserCardProperties: Required<DiscordUserCardProperties> = {
	user: {
		avatar: { animated: true, id: "6170487d32fdfe9f988720ad80e6ab8c" },
		banner: { animated: false, id: "3e30cd914362f27e07b3b4634c7600be" },
		bot: true,
		discriminator: "0000",
		displayName: "Clyde",
		flags: 0,
		id: "1081004946872352958",
		username: "clyde",
	},
	activities: [],
};
