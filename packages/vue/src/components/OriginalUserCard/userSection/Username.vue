<script setup lang="ts">
import type { DiscordUserCardUser } from "@discord-user-card/core";

defineProps<{ user: DiscordUserCardUser }>();
</script>

<template>
	<div class="usernameSection">
		<div>
			<div class="userText">
				<h1 class="displayName">{{ user.displayName ?? user.username }}</h1>
				<div class="userTag">
					<span class="userTagUsername">{{ user.username }}</span>
				</div>
			</div>
			<div v-if="user.pronouns" class="pronouns">{{ user.pronouns }}</div>
		</div>
		<!-- Clan Tag -->
		<div></div>
	</div>
</template>
