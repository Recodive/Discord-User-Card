import type { DiscordUserCardProperties } from "./types/index.js";

export * from "./functions/index.js";
export * from "./types/index.js";

export const defaultUserCardProperties: Required<DiscordUserCardProperties> = {
	user: {
		app: true,
		avatar: { animated: true, id: "6170487d32fdfe9f988720ad80e6ab8c" },
		banner: { animated: false, id: "3e30cd914362f27e07b3b4634c7600be" },
		bio: "Hi! I\u2019m Clyde, Discord's AI chatbot, at your service \uD83E\uDEE1 Please @ me.",
		discriminator: "0000",
		displayName: "Clyde",
		id: "1081004946872352958",
		themeColors: { primary: 10594552, secondary: 5793266 },
		username: "clyde",
	},
	activities: [],
};
