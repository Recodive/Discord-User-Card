import {
	DiscordUserCardProperties,
	flagsToBadges,
	PresenceUpdateStatus,
} from "@discord-user-card/core";
import "./styles/index.scss";
import { setupDiscordUserCard } from "./html/index.js";

const root = document.querySelector<HTMLDivElement>("#app")!;

const a: DiscordUserCardProperties = {
		user: {
			id: "223238938716798978",
			username: "timeraa",
			displayName: "Timeraa",
			avatar: {
				id: "782b098327195dbc3d07619c67778a65",
				animated: false,
			},
			discriminator: "0",
			badges: flagsToBadges(4194432),
			banner: {
				id: "92dfc45d41b3936613f5882df1aa45a6",
				animated: false,
			},
			bio: "\u2b50 Creator of **PreMiD**  \u2b50\n\n\ud83d\udcee Feel free to dm\n\ud83d\udc0e Brony  \u2642\ufe0f  **22**\n\ud83d\udc68\u200d\ud83d\udcbb  **GitHub**: @Timeraa",
			status: PresenceUpdateStatus.Online,
			themeColors: {
				primary: 3245224,
				secondary: 4827185,
			},
		},
		activities: [],
	},
	b: DiscordUserCardProperties = {
		user: {
			id: "936175826330877963",
			username: "autoflexbas",
			displayName: "Bas van Zanten",
			avatar: {
				id: "39e168510cf8a39c6a3a01ac331ff342",
				animated: false,
			},
			discriminator: "0",
			status: PresenceUpdateStatus.Idle,
			bannerColor: 145990,
			bio: "__*underline italics*__\n__**underline bold**__\n__***underline bold italics***__\n~~Strikethrough~~\n`code`\n> quote\n||hi||\n\ud83d\ude04\n<:swagcat:708490021853724713>",
		},
		activities: [],
	},
	c: DiscordUserCardProperties = {
		user: {
			id: "756063376911761479",
			username: "autoflexmustafa",
			displayName: "Mustafa Yildirim",
			status: PresenceUpdateStatus.DoNotDisturb,
		},
		activities: [],
	};

root.innerHTML = `
	<div style="display: flex; max-height: 100vh; flex-wrap: wrap">
		<div id="card-1"></div>
		<div id="card-2"></div>
		<div id="card-3"></div>
		<div id="card-4"></div>
	</div>
`;

setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-1")!).render(
	a
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-2")!).render(
	b
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-3")!).render(
	c
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-4")!).render(
	{}
);
