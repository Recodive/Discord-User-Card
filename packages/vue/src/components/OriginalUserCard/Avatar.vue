<script setup lang="ts">
import type { DiscordUserCardUser } from '@discord-user-card/core';

defineProps<{ user: DiscordUserCardUser }>();
</script>

<template>
	<div class="avatarWrapper avatarWrapperPositionPremiumBanner">
		<div class="avatarWrapperInner" role="img" aria-label="timeraa, Online" aria-hidden="false">
			<svg width="92" height="92" viewBox="0 0 92 92" class="avatarSvg" aria-hidden="true">
				<foreignObject x="0" y="0" width="80" height="80" mask="url(#svg-mask-avatar-status-round-80)">
					<div class="avatarStack">
						<img src="https://cdn.discordapp.com/avatars/223238938716798978/782b098327195dbc3d07619c67778a65.webp?size=80" alt=" " class="avatar" aria-hidden="true">
					</div>
				</foreignObject>
				<circle fill="black" r="14" cx="68" cy="68" style="opacity: 0.45;"></circle>
				<rect width="16" height="16" x="60" y="60" fill="#23a55a" mask="url(#svg-mask-status-online)"></rect>
			</svg>
			<svg width="108" height="96" viewBox="0 0 108 96" class="avatarDecoration" aria-hidden="true">
				<foreignObject x="0" y="0" width="96" height="96" mask="url(#svg-mask-avatar-decoration-status-round-80)">
					<div class="avatarStack">
						<img class="avatar" src="https://cdn.discordapp.com/avatar-decoration-presets/a_3e1fc3c7ee2e34e8176f4737427e8f4f.png?size=96&amp;passthrough=true" alt=" " aria-hidden="true">
					</div>
				</foreignObject>
			</svg>
		</div>
	</div>
</template>

<style scoped>
.avatarStack  {
	display: grid;
	width:  100%;
	height: 100%;
}

.avatar {
	display: block;
  -o-object-fit: cover;
	object-fit: cover;
	pointer-events: none;
	width: 100%;
	height: 100%;
	grid-area: 1 / 1;
}

.avatarSvg  {
	position: absolute;
	contain: paint;
	width:  auto;
	display: block;
	pointer-events: none;
}

.avatarDecoration {
	position: absolute;
	contain: paint;
	pointer-events: none;
	top: var(--custom-avatar-avatar-decoration-border-position);
	left: var(--custom-avatar-avatar-decoration-border-position)
}

.avatarWrapper  {
	position:  absolute;
	z-index:  0;
	top: 80px;
	left:  22px;
	border-radius: 50%;
}

.avatarWrapperPositionPremiumBanner  {
	top: 76px;
}

.avatarWrapperInner  {
	position:  relative;
	width:  80px;
	height:  80px;
	border-radius: 50%;
}

.avatar::before {
	content: "";
	display: block;
	width: 100%;
	height: 100%;
	background-color: var(--background-modifier-accent);
}
</style>
