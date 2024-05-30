<script setup lang="ts">
import type { DiscordUserCardUser } from "@discord-user-card/core";

defineProps<{ user: DiscordUserCardUser }>();
</script>

<template>
	<div class="duc_username_section">
		<div>
			<div class="duc_user_text">
				<h1 class="duc_display_name">
					{{ user.displayName ?? user.username }}
				</h1>
				<div class="duc_user_tag">
					<span class="duc_user_tag_username">{{ user.username }}</span>
					<span
						v-if="user.discriminator && user.discriminator !== '0'"
						class="duc_discriminator"
						>#{{ user.discriminator }}</span
					>
					<span v-if="user.app || user.system" class="duc_bot_tag">
						<svg
							:aria-label="user.system ? 'System User' : 'Verified App'"
							class="duc_bot_tag_verified"
							aria-hidden="false"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								fill-rule="evenodd"
								d="M18.7 7.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.29 7.3-7.3a1 1 0 0 1 1.4 0Z"
								clip-rule="evenodd"
							></path>
						</svg>
						<span class="duc_bot_text">{{
							user.system ? "SYSTEM" : "APP"
						}}</span>
					</span>
				</div>
			</div>
			<div v-if="user.pronouns" class="duc_pronouns">{{ user.pronouns }}</div>
		</div>
		<!-- Clan Tag -->
		<div></div>
	</div>
</template>
