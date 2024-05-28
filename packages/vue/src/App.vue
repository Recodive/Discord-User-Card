<script setup lang="ts">
import type { DiscordUserCardProperties } from '@discord-user-card/core';
import DiscordUserCard from './components/DiscordUserCard.vue'

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
		bio: "\u2b50 Creator of **PreMiD**  \u2b50\n\n\ud83d\udcee Feel free to dm\n\ud83d\udc0e Brony  \u2642\ufe0f  **22**\n\ud83d\udc68\u200d\ud83d\udcbb  **GitHub**: @Timeraa"
	},
	activities: []
};
</script>

<template>
  <DiscordUserCard :user="a.user" :activities="a.activities" />
</template>

<style scoped>
</style>
