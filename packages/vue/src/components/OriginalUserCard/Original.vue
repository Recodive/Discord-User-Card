<script setup lang="ts">
import { defaultUserCardProperties, DiscordUserCardProperties } from "@discord-user-card/core";
import Masks from "./Masks.vue";
import Avatar from "./Avatar.vue";
import Banner from "./Banner.vue";
import ProfileBadges from "./ProfileBadges.vue";
import UserSection from "./userSection/Index.vue";
import { toRefs } from "vue";

const props = defineProps<Required<DiscordUserCardProperties>>(),
	{ user, activities } = toRefs(props);

console.log(user, activities, defaultUserCardProperties);
</script>

<template>
	<div :aria-label="user.username" class="theme-dark">
		<Masks/>
		<div class="userProfileOuter userProfileOuterThemed" :style="{
			'--profile-gradient-primary-color': 'hsla(198, 54.8%, 42.5%, 1)',
			'--profile-gradient-secondary-color': 'hsla(108, 54.8%, 42.5%, 1)',
			'--profile-gradient-overlay-color': 'hsla(0,0%,0%,0.6)',
			'--profile-gradient-button-color': 'hsla(197, 100%, 23.7%, 1)',
			'--profile-avatar-border-color': 'hsla(199, 55.8%, 16.9%, 1)',
			'--profile-body-background-color': 'hsla(0,0%,0%,0.45)',
			'--profile-body-background-hover': 'hsla(0,0%,100%,0.16)',
			'--profile-body-divider-color': 'hsla(0, 0%, 100%, 0.24)',
			'--profile-body-border-color': 'hsla(0, 0%, 100%, 0.12)',
			'--profile-message-input-border-color': 'hsla(112, 30.2%, 37.6%, 1)',
			'--profile-note-background-color': 'hsla(0,0%,0%,0.3)',
			'--profile-role-pill-background-color': 'hsla(228,6.67%,14.71%,0.5)',
			'--profile-role-pill-border-color': 'hsla(0,0%,100%,0.2)',
			'--custom-theme-mix-base-hsl': '198.46153846153845 100% 5.098039215686274%',
			'--custom-theme-mix-base': 'rgb(0,18,26)',
			'--custom-theme-mix-text': 'rgb(223,240,214)',
			'--custom-theme-mix-amount-base': '30%',
			'--custom-theme-mix-amount-text': '70%',
		}">
			<div class="userProfileInner"  :class="{
				userProfileInnerThemedWithBanner: user.banner
			}">
				<Banner :user="user"/>
				<Avatar :user="user"/>
				<ProfileBadges :user="user"/>
				<UserSection :user="user" :activities="activities" />
			</div>
		</div>
	</div>
</template>

<style>
@import url('../../assets/discord.css');

.userProfileOuterThemed {
	background: linear-gradient(var(--profile-gradient-primary-color),var(--profile-gradient-secondary-color))
}

.userProfileOuter.userProfileOuterThemed {
	padding: 4px;
}

.userProfileOuter {
	--custom-user-popout-outside-components-height: 1px;
	box-shadow: var(--elevation-high);
	max-height: calc(100vh - 20px - var(--custom-user-popout-outside-components-height));
	width: var(--custom-user-profile-themed-container-user-popout-width);
	overflow: hidden;
	position: relative;
  border-radius: var(--radius-sm);
}

.userProfileInner {
	max-height: calc(100vh - 28px - var(--custom-user-popout-outside-components-height));
	display:  flex;
	flex-direction: column;
	flex-grow:1;
	border-radius: var(--radius-sm) var(--radius-sm) 0 0;
}

.userProfileInner::before  {
	content: "";
	position: absolute;
	background: var(--profile-gradient-overlay-color);
	pointer-events: none;
	border-radius: var(--radius-xs);
	width: calc(100% - 8px);
	height: calc(100% - 8px);
}

.userProfileInnerThemedWithBanner {
	background: linear-gradient(var(--profile-gradient-primary-color),var(--profile-gradient-primary-color)var(--custom-user-banner-premium-banner-height-popout),var(--profile-gradient-secondary-color));
}
</style>
