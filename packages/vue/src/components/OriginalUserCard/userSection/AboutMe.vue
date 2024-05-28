<script setup lang="ts">
import type { DiscordUserCardUser } from "@discord-user-card/core";
import Markdown from "../Markdown.vue";

defineProps<{ user: DiscordUserCardUser }>();
</script>

<template>
	<div class="duc_section" v-if="user.bio">
		<h2 class="aboutMeTitle">About Me</h2>
		<Markdown :markdown="user.bio" />
	</div>
</template>
