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
		pronouns: "he/him",
		avatar: "782b098327195dbc3d07619c67778a65",
		discriminator: "0",
		badges: flagsToBadges(4194432),
		banner: "92dfc45d41b3936613f5882df1aa45a6",
		bio: "\u2B50 Creator of **PreMiD**  \u2B50\n\n\uD83D\uDCEE Feel free to dm\n\uD83D\uDC0E Brony  \u2642\uFE0F  **22**\n\uD83D\uDC68\u200D\uD83D\uDCBB  **GitHub**: @Timeraa",
		status: PresenceUpdateStatus.Online,
		themeColors: {
			primary: 3245224,
			secondary: 4827185,
		},
		profileEffect: "1139323099251232829",
		roles: [
			{
				id: "726513805328121856",
				name: "Minecraft",
				position: 9,
				color: 0,
				emoji: "🎮",
			},
			{
				id: "673682085608816652",
				name: "Project Management",
				position: 35,
				color: 15158332,
				icon: "758ae4cad89ea4a2bec55951fe38a40d",
			},
			{
				id: "852978081358282763",
				name: "Muted",
				position: 2,
				color: 1,
			},
			{
				id: "1027665813525778436",
				name: "Software Engineer",
				position: 33,
				color: 0,
				icon: "45ad1e95b921f1a975b2bbb6ea676f58",
			},
		],
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
				hash: "a_511956534578774056",
				name: "FlyingTimeraa",
			},
		},
	],
};
const b: DiscordUserCardProperties = {
	user: {
		id: "936175826330877963",
		username: "autoflexbas",
		displayName: "Bas van Zanten",
		avatar: "39e168510cf8a39c6a3a01ac331ff342",
		discriminator: "0",
		status: PresenceUpdateStatus.Idle,
		bannerColor: 145990,
		bio: "<a:ViViClap:639956089990807572>\n||foo||",
		clan: {
			identityGuildId: "1184379679621255168",
			tag: "\u14DA\u160F\u15E2",
			badge: "f2da48f1d6c79e605a787aefbf2c4bf1",
		},
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
		avatar: "a_4d1e5fef85948a52a93ef8146fddc4b0",
		clan: {
			identityGuildId: "1184379679621255168",
			tag: "\u14DA\u160F\u15E2",
			badge: "f2da48f1d6c79e605a787aefbf2c4bf1",
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
		banner: "a_6e16d7173d8e1201095c3ca57bcc3eb5",
		bannerColor: 1579292,
		bio: "조급할 필요 없어 My Pace\n비교 따윈 하지 마\n천천히 달려도 괜찮아\n나의 길을 따라 My lane\n급한 맘 내려놔\n앞만 보고 달려가",
		status: PresenceUpdateStatus.DoNotDisturb,
		themeColors: {
			primary: 16755370,
			secondary: 7506394,
		},
		avatarDecoration: "a_3e1fc3c7ee2e34e8176f4737427e8f4f",
		profileEffect: "1174460912699191336",
	},
	activities: [
		{
			type: 4,
			name: "Custom Status",
			emoji: {
				hash: "a_440704948653785101",
				name: "DayoungKms",
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
				{
					label: "View Repository",
					url: "https://github.com/Recodive/Discord-User-Card",
				},
			],
		},
		{
			type: 0,
			name: "The Forest",
			startTimestamp: 1718981704172,
			applicationId: "363409179668512788",
		},
		{
			type: 2,
			name: "Spotify",
			state: "YOUHA",
			details: "오늘 조금 취해서 그래",
			startTimestamp: now,
			endTimestamp: now + 200173,
			largeImage: "spotify:ab67616d0000b273ead72e8dd961206f05079de7",
			largeImageText: "오늘 조금 취해서 그래",
			buttons: [
				{
					label: "Listen Along",
					url: "https://open.spotify.com/track/1pU5SijPp89lNrZHJL0166",
				},
				{
					label: "View Album",
					url: "https://open.spotify.com/album/6QpIl0FPITcpoJTn5HP4vD",
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
		<div id="profile-1"></div>
		<div id="profile-2"></div>
		<div id="profile-3"></div>
		<div id="profile-4"></div>
		<div id="profile-5"></div>
		<div id="profile-6"></div>
	</div>
`;

setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-1")!, {
	type: "card",
}).render(
	{},
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-2")!, {
	type: "card",
}).render(
	a,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-3")!, {
	type: "card",
}).render(
	b,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-4")!, {
	type: "card",
}).render(
	c,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-5")!, {
	type: "card",
}).render(
	d,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#card-6")!, {
	type: "card",
}).render(
	e,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#profile-1")!, {
	type: "profile",
}).render(
	{},
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#profile-2")!, {
	type: "profile",
}).render(
	a,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#profile-3")!, {
	type: "profile",
}).render(
	b,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#profile-4")!, {
	type: "profile",
}).render(
	c,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#profile-5")!, {
	type: "profile",
}).render(
	d,
);
setupDiscordUserCard(document.querySelector<HTMLDivElement>("#profile-6")!, {
	type: "profile",
}).render(
	e,
);
