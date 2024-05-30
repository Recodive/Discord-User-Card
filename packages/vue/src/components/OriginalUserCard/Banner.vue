<script setup lang="ts">
import {
	ColorUtils,
	discrimToAvatar,
	getColorFromImage,
	imageToUrl,
	type DiscordUserCardUser,
} from "@discord-user-card/core";
import { computed, ref, watch } from "vue";

const props = defineProps<{ user: DiscordUserCardUser }>();

const banner = computed(() => {
	if (!props.user.banner) return;
	return imageToUrl({
		image: props.user.banner,
		scope: "banners",
		relatedId: props.user.id,
	});
});

const randomUUID = crypto.randomUUID().slice(0, 8);

const avatar = computed(() => {
	if (!props.user.avatar)
		return discrimToAvatar(props.user.id, props.user.discriminator);
	return imageToUrl({
		image: props.user.avatar,
		scope: "avatars",
		relatedId: props.user.id,
	});
});

const bannerColor = computed(() => {
	if (!props.user.bannerColor) return null;
	const [r, g, b] = ColorUtils.intToRgb(props.user.bannerColor);
	return `rgb(${r}, ${g}, ${b})`;
});

async function getBackgroundColor() {
	if (bannerColor.value) return bannerColor.value;
	const [dominantColor] = await getColorFromImage(avatar.value);
	return `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
}

const backgroundColor = ref<string>(await getBackgroundColor());

watch([avatar, banner], async () => {
	backgroundColor.value = await getBackgroundColor();
});
</script>

<template>
	<svg
		class="bannerSVGWrapper"
		:viewBox="banner ? '0 0 340 120' : '0 0 340 60'"
		:style="{
			'min-width': '340px',
			'min-height': banner ? '120px' : '60px',
		}"
	>
		<mask :id="`mask_avatar_${randomUUID}`">
			<rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
			<circle
				fill="black"
				:cx="user.banner ? 58 : 62"
				:cy="user.banner ? 112 : 56"
				r="46"
			></circle>
		</mask>
		<foreignObject
			x="0"
			y="0"
			width="100%"
			height="100%"
			overflow="visible"
			:mask="`url(#mask_avatar_${randomUUID})`"
		>
			<div
				class="banner"
				:class="{
					bannerPremium: banner,
				}"
				:style="{
					'background-color': backgroundColor,
					...(banner && {
						'background-image': `url(&quot;${banner}?size=480&quot;)`,
					}),
				}"
			/>
		</foreignObject>
	</svg>
</template>
