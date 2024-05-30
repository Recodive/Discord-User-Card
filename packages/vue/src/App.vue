<script setup lang="ts">
import "@discord-user-card/core/style.css";
import {
	PresenceUpdateStatus,
	type DiscordUserCardProperties,
} from "@discord-user-card/core";
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
			flags: 4194432,
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
			flags: 0,
			status: PresenceUpdateStatus.Idle,
			bannerColor: 145990,
			bio: "__*underline italics*__\n__**underline bold**__\n__***underline bold italics***__\n~~Strikethrough~~\n`code`\n> quote\n||hi||\n\ud83d\ude04",
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
</script>

<template>
	<div style="display: flex; max-height: 100vh; flex-wrap: wrap">
		<DiscordUserCard />
		<DiscordUserCard :user="a.user" :activities="a.activities" />
		<DiscordUserCard :user="b.user" :activities="b.activities" />
		<DiscordUserCard :user="c.user" :activities="c.activities" />
	</div>
</template>
