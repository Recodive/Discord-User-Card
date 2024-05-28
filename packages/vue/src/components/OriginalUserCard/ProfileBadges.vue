<script setup lang="ts">
import type { DiscordUserCardUser } from '@discord-user-card/core';
import { ref } from 'vue';

defineProps<{ user: DiscordUserCardUser }>();

const badges = ref<string[]>(["https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png"]);

</script>

<template>
	<div class="profileBadges">
		<template  v-for="badge of badges">
			<img class="profileBadge" :src="badge" alt=" ">
		</template>
	</div>
</template>

<style>
.profileBadges {
	box-sizing: content-box;
	position: relative;
	top: 12px;
	right:  16px;
	width: fit-content;
	align-self: flex-end;
	background-color: var(--profile-body-background-color);
	border-radius: var(--radius-sm);
	max-width: 190px;
	padding:  4px;
	display: flex;
	flex-wrap:  wrap;
	justify-content: flex-end;
	align-items:center;
	gap:  2px;
	min-height: 22px;
}

.profileBadge {
	width:  22px;
	height:  22px;
	display: block;
	background-repeat: no-repeat;
	background-size: contin;
	background-position: center;
	overflow: hidden;
	pointer-events: none;
	-o-object-fit: cover;
	object-fit: cover;
	filter: saturate(1);
}
</style>
