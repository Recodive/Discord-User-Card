<script setup lang="ts">
import type { DiscordUserCardUser } from '@discord-user-card/core';

defineProps<{ user: DiscordUserCardUser }>();
</script>

<template>
	<svg class="bannerSVGWrapper" viewBox="0 0 340 120" style="min-width: 340px; min-height: 120px;">
		<mask id="mask_avatar">
			<rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
			<circle fill="black" cx="58" cy="112" r="46"></circle>
		</mask>
		<foreignObject x="0" y="0" width="100%" height="100%" overflow="visible" mask="url(#mask_avatar)">
			<div class="banner bannerPremium" :style="{
				'background-image': 'url(&quot;https://cdn.discordapp.com/banners/223238938716798978/92dfc45d41b3936613f5882df1aa45a6.png?size=480&quot;)',
				'background-color': 'rgb(49, 134, 170)'
			}"/>
		</foreignObject>
	</svg>
</template>

<style scoped>
.bannerSVGWrapper  {
	z-index: 0;
	contain: paint;
}

.banner {
	transition: background-color .1s;
	width: 100%;
	border-radius: var(--radius-xs) var(--radius-xs) 0 0;
}

.bannerPremium {
	height: var(--custom-user-banner-premium-banner-height-popout);
	min-height: var(--custom-user-banner-premium-banner-height-popout);
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
}
</style>
