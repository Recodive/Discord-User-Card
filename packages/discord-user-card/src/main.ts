import type {
	DiscordUserCardProperties,
} from "@discord-user-card/core";
import {
	DiscordUserCardBadges,
	PresenceUpdateStatus,
	flagsToBadges,
} from "@discord-user-card/core";
import "./styles/index.scss";
import { setupDiscordUserCard } from "./renderers/index.js";

const root = document.querySelector<HTMLDivElement>("#app")!;

const now = Date.now();

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
		bio: "\u2B50 Creator of **PreMiD**  \u2B50\n\n\uD83D\uDCEE Feel free to dm\n\uD83D\uDC0E Brony  \u2642\uFE0F  **22**\n\uD83D\uDC68\u200D\uD83D\uDCBB  **GitHub**: @Timeraa",
		status: PresenceUpdateStatus.Online,
		themeColors: {
			primary: 3245224,
			secondary: 4827185,
		},
		profileEffect: "1139323099251232829",
	},
	activities: [
		{
			type: 4,
			name: "Custom Status",
			state: "In the end, only kindness matters",
		},
		{
			type: 6,
			name: "Hang Status",
			state: "custom",
			details: "Horsing rounds",
			emoji: {
				id: "511956534578774056",
				name: "FlyingTimeraa",
				animated: true,
			},
		},
	],
};
const b: DiscordUserCardProperties = {
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
		bio: "<a:ViViClap:639956089990807572>",
	},
	activities: [
		{
			type: 2,
			name: "Spotify",
			state: "YOUHA",
			details: "ICE T",
			startTimestamp: now,
			endTimestamp: now + 200173,
			largeImage: "spotify:ab67616d0000b27304988621bc00de8c6df69330",
			largeImageText: "Sweet-Tea",
		},
	],
};
const c: DiscordUserCardProperties = {
	user: {
		id: "756063376911761479",
		username: "autoflexmustafa",
		displayName: "Mustafa Yildirim",
		status: PresenceUpdateStatus.DoNotDisturb,
	},
	activities: [
		{
			name: "Hang Status",
			type: 6,
			state: "chilling",
		},
	],
};
const d: DiscordUserCardProperties = {
	user: {
		id: "241278257335500811",
		username: "bas950",
		displayName: "Bas950",
		avatar: {
			id: "4d1e5fef85948a52a93ef8146fddc4b0",
			animated: true,
		},
		discriminator: "0",
		badges: [
			DiscordUserCardBadges.HYPESQUAD_HOUSE_BALANCE,
			DiscordUserCardBadges.QUEST,
			DiscordUserCardBadges.LEGACY_USERNAME,
			DiscordUserCardBadges.ACTIVE_DEVELOPER,
			DiscordUserCardBadges.GUILD_BOOSTER_LVL9,
			DiscordUserCardBadges.EARLY_SUPPORTER,
			DiscordUserCardBadges.PREMIUM,
		],
		banner: {
			id: "6e16d7173d8e1201095c3ca57bcc3eb5",
			animated: true,
		},
		bannerColor: 1579292,
		bio: "조급할 필요 없어 My Pace\n비교 따윈 하지 마\n천천히 달려도 괜찮아\n나의 길을 따라 My lane\n급한 맘 내려놔\n앞만 보고 달려가",
		status: PresenceUpdateStatus.DoNotDisturb,
		themeColors: {
			primary: 16755370,
			secondary: 7506394,
		},
		avatarDecoration: {
			id: "3e1fc3c7ee2e34e8176f4737427e8f4f",
			animated: true,
		},
		profileEffect: "1174460912699191336",
	},
	activities: [
		{
			type: 4,
			name: "Custom Status",
			emoji: {
				id: "440704948653785101",
				name: "DayoungKms",
				animated: true,
			},
			state: "Life is a rollercoaster...",
		},
		{
			type: 0,
			name: "Visual Studio Code",
			state: "📂 Discord-User-Card • Discord-User-Card",
			details: "📝 root.scss • 5/189",
			startTimestamp: now - 10000000,
			largeImage: "565945350897008640",
			largeImageText: "scss",
			smallImage: "565945770067623946",
			smallImageText: "Visual Studio Code",
			applicationId: "383226320970055681",
			buttons: [
				{
					label: "View Repository",
					url: "https://github.com/Recodive/Discord-User-Card",
				},
			],
		},
	],
};
const e: DiscordUserCardProperties = {
	activities: [
		{
			type: 0,
			name: "The Forest",
			startTimestamp: 1718981704172,
			applicationId: "363409179668512788",
		},
	],
};

root.innerHTML = `
	<div style="display: flex; max-height: 100vh; flex-wrap: wrap">
		<div id="card-1"></div>
		<div id="card-2"></div>
		<div id="card-3"></div>
		<div id="card-4"></div>
		<div id="card-5"></div>
		<div id="card-6"></div>
	</div>
`;

setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-1")!).render(
	{},
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-2")!).render(
	a,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-3")!).render(
	b,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-4")!).render(
	c,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-5")!).render(
	d,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-6")!).render(
	e,
);
