<script setup lang="ts">
import type { DiscordUserCardUser } from '@discord-user-card/core';

defineProps<{ user: DiscordUserCardUser }>();
</script>

<template>
	<div class="usernameSection">
		<div>
			<div class="userText">
				<h1 class="displayName">{{ user.displayName ?? user.username }}</h1>
				<div class="userTag">
					<span  class="userTagUsername">{{ user.username }}</span>
				</div>
			</div>
			<div v-if="user.pronouns" class="pronouns">{{ user.pronouns }}</div>
		</div>
		<!-- Clan Tag -->
		<div></div>
	</div>
</template>

<style scoped>
	.usernameSection {
		padding-top: 12px;
		padding-right: 12px;
		padding-left: 12px;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.pronouns  {
		display: inline-block;
		user-select: none;
		padding-top: 2px;
		font-family: var(--font-primary);
		font-size:  14px;
		line-height:  1.2857142857142858;
		font-weight: 400;
		color: var(--text-normal);
	}

	.displayName {
		word-break: break-word;
		font-family: var(--font-display);
		font-size:  20px;
		line-height:  1.2;
		font-weight: 600;
		color: var(--header-primary);
	}

	.userText {
		user-select: text;
	}

	.userTag  {
		font-family: var(--font-primary);
		font-size:  14px;
		line-height: 18px;
		font-weight: 500;
		display: block;
		overflow: hidden;
		white-space: nowrap;
	}

	.userTagUsername {
		overflow: auto;
		word-break: break-all;
		text-overflow: clip;
		white-space: normal;
		color: var(--header-primary);
		vertical-align: top;
		display: inline;
	}
</style>
