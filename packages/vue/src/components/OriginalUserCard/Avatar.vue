<script setup lang="ts">
import { discrimToAvatar, imageToUrl, PresenceUpdateStatus, type DiscordUserCardUser } from '@discord-user-card/core';
import { computed } from 'vue';

const props = defineProps<{ user: DiscordUserCardUser }>();

const avatar = computed(() => {
	if (!props.user.avatar) return discrimToAvatar(props.user.id, props.user.discriminator);
	return imageToUrl({
		image: props.user.avatar,
		scope: 'avatars',
		relatedId: props.user.id,
	});
});

const decoration = computed(() => {
	if (!props.user.avatarDecoration) return;
	return imageToUrl({
		image: props.user.avatarDecoration,
		scope: 'avatar-decoration-presets',
		relatedId: props.user.id,
	});
});

const status = computed(() => {
	if (!props.user.status) return PresenceUpdateStatus.Offline;
	if (props.user.status === PresenceUpdateStatus.Invisible) return PresenceUpdateStatus.Offline;
	return props.user.status;
});

const statusColor = computed(() => {
	switch (status.value) {
		case PresenceUpdateStatus.Online:
			return "#23a55a";
		case PresenceUpdateStatus.Idle:
			return "#f0b232";
		case PresenceUpdateStatus.DoNotDisturb:
			return "#f23f43";
		default:
			return "#80848e";
	}
});
</script>

<template>
	<div class="avatarWrapper" :class="{
	avatarWrapperPositionPremiumBanner: !!user.banner,
		avatarPositionNormal: !user.banner,
	}">
		<div class="avatarWrapperInner" role="img" aria-label="timeraa, Online" aria-hidden="false">
			<svg width="92" height="92" viewBox="0 0 92 92" class="avatarSvg" aria-hidden="true">
				<foreignObject x="0" y="0" width="80" height="80" mask="url(#svg-mask-avatar-status-round-80)">
					<div class="avatarStack">
						<img :src="`${avatar}?size=80`" alt=" " class="avatar" aria-hidden="true">
					</div>
				</foreignObject>
				<circle fill="black" r="14" cx="68" cy="68" style="opacity: 0.45;"></circle>
				<rect width="16" height="16" x="60" y="60" :fill="statusColor" :mask="`url(#svg-mask-status-${status})`"></rect>
			</svg>
			<svg v-if="decoration" width="108" height="96" viewBox="0 0 108 96" class="avatarDecoration" aria-hidden="true">
				<foreignObject x="0" y="0" width="96" height="96" mask="url(#svg-mask-avatar-decoration-status-round-80)">
					<div class="avatarStack">
						<img class="avatar" :src="`${decoration}&amp;size=96`" alt=" " aria-hidden="true">
					</div>
				</foreignObject>
			</svg>
		</div>
	</div>
</template>
