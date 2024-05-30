<script setup lang="ts">
import {
	ColorUtils,
	type DiscordUserCardProperties,
} from "@discord-user-card/core";
import Masks from "./Masks.vue";
import Avatar from "./Avatar.vue";
import Banner from "./Banner.vue";
import ProfileBadges from "./ProfileBadges.vue";
import UserSection from "./userSection/Index.vue";
import { computed, type StyleValue, toRefs } from "vue";

const props = defineProps<Required<DiscordUserCardProperties>>(),
	{ user, activities } = toRefs(props);

const style = computed((): StyleValue => {
	if (!user.value.themeColors) {
		return {
			"--profile-gradient-primary-color": "var(--background-secondary-alt)",
			"--profile-gradient-secondary-color": "var(--background-secondary-alt)",
			"--profile-gradient-overlay-color": "rgba(0, 0, 0, 0)",
			"--profile-gradient-button-color": "var(--button-secondary-background)",
			"--profile-avatar-border-color": "var(--background-secondary-alt)",
			"--profile-body-background-color": "var(--background-floating)",
			"--profile-body-background-hover": "var(--background-modifier-hover)",
			"--profile-body-divider-color": "var(--background-modifier-accent)",
			"--profile-body-border-color": "var(--border-faint)",
			"--profile-message-input-border-color":
				"var(--background-modifier-accent)",
			"--profile-note-background-color": " var(--background-tertiary)",
			"--profile-role-pill-background-color": "var(--background-secondary-alt)",
			"--profile-role-pill-border-color": "var(--interactive-normal)",
		};
	}

	const primary = ColorUtils.intToHsl(user.value.themeColors.primary),
		secondary = ColorUtils.intToHsl(user.value.themeColors.secondary);

	return {
		"--profile-gradient-primary-color": `hsla(${primary[0]}, ${primary[1]}%, ${primary[2]}%, 1)`,
		"--profile-gradient-secondary-color": `hsla(${secondary[0]}, ${secondary[1]}%, ${secondary[2]}%, 1)`,
		"--profile-gradient-overlay-color": "hsla(0,0%,0%,0.6)",
		"--profile-gradient-button-color": "hsla(197, 100%, 23.7%, 1)",
		"--profile-avatar-border-color": "hsla(199, 55.8%, 16.9%, 1)",
		"--profile-body-background-color": "hsla(0,0%,0%,0.45)",
		"--profile-body-background-hover": "hsla(0,0%,100%,0.16)",
		"--profile-body-divider-color": "hsla(0, 0%, 100%, 0.24)",
		"--profile-body-border-color": "hsla(0, 0%, 100%, 0.12)",
		"--profile-message-input-border-color": "hsla(112, 30.2%, 37.6%, 1)",
		"--profile-note-background-color": "hsla(0,0%,0%,0.3)",
		"--profile-role-pill-background-color": "hsla(228,6.67%,14.71%,0.5)",
		"--profile-role-pill-border-color": "hsla(0,0%,100%,0.2)",
		"--custom-theme-mix-base-hsl": "198.46153846153845 100% 5.098039215686274%",
		"--custom-theme-mix-base": "rgb(0,18,26)",
		"--custom-theme-mix-text": "rgb(223,240,214)",
		"--custom-theme-mix-amount-base": "30%",
		"--custom-theme-mix-amount-text": "70%",
	};
});
</script>

<template>
	<div :aria-label="user.username" class="duc_root theme-dark">
		<Masks />
		<div
			class="userProfileOuter"
			:class="{
				userProfileOuterThemed: !!user.themeColors,
			}"
			:style="style"
		>
			<div class="userProfileInner">
				<Banner :user="user" />
				<Avatar :user="user" />
				<ProfileBadges :user="user" />
				<UserSection :user="user" :activities="activities" />
			</div>
		</div>
	</div>
</template>
