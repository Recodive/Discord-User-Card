<script setup lang="ts">
import type { DiscordUserCardUser } from "@discord-user-card/core";
import { ref } from "vue";

defineProps<{ user: DiscordUserCardUser }>();

const badges = ref<string[]>([
	"https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png",
]);
</script>

<template>
	<div class="profileBadges">
		<template v-for="badge of badges">
			<img class="profileBadge" :src="badge" alt=" " />
		</template>
	</div>
</template>
