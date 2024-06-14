<script setup lang="ts">
import "discord-user-card/style.css";
import {
	type DiscordUserCardProperties,
	PresenceUpdateStatus,
	flagsToBadges,
} from "discord-user-card";
import DiscordUserCard from "./components/DiscordUserCard.vue";

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
	},
	activities: [],
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
		bio: "__*underline italics*__\n__**underline bold**__\n__***underline bold italics***__\n~~Strikethrough~~\n`code`\n> quote\n||hi||\n\uD83D\uDE04\n<:swagcat:708490021853724713>",
	},
	activities: [],
};
const c: DiscordUserCardProperties = {
	user: {
		id: "756063376911761479",
		username: "autoflexmustafa",
		displayName: "Mustafa Yildirim",
		status: PresenceUpdateStatus.DoNotDisturb,
	},
	activities: [],
};
</script>

<template>
	<div style="display: flex; max-height: 100vh; flex-wrap: wrap">
		<DiscordUserCard :user="a.user" :activities="a.activities" />
		<DiscordUserCard :user="b.user" :activities="b.activities" />
		<DiscordUserCard :user="c.user" :activities="c.activities" />
		<DiscordUserCard />
	</div>
</template>
