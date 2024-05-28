<script setup lang="ts">
import type { DiscordUserCardUser } from '@discord-user-card/core';
import Markdown from '../Markdown.vue';

defineProps<{ user: DiscordUserCardUser }>();
</script>

<template>
	<div class="aboutMeSection" v-if="user.bio">
		<h2 class="aboutMeTitle">About Me</h2>
		<Markdown :markdown="user.bio" />
	</div>
</template>

<style scoped>
	.aboutMeSection {
		padding-top: 12px;
	}

	.aboutMeTitle {
		display: flex;
		font-weight: 700;
		margin-bottom: 6px;
		color: var(--header-primary);
		font-family: var(--font-display);
		font-size: 12px;
		line-height: 1.3333333333333333;
		text-transform: uppercase;
		letter-spacing: .02em;
	}

	.aboutMeText {
		-webkit-line-clamp: 6;
		font-family: var(--font-primary);
    font-size: 14px;
    line-height: 1.2857142857142858;
    font-weight: 400;
		display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
		color: var(--text-normal);
	}
</style>
