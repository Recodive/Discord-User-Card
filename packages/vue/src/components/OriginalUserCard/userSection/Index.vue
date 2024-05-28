<script setup lang="ts">
import type { DiscordUserCardProperties } from "@discord-user-card/core";
import { toRefs } from "vue";
import Username from "./Username.vue";
import CustomStatus from "./CustomStatus.vue";
import AboutMe from "./AboutMe.vue";

const props = defineProps<Required<DiscordUserCardProperties>>(),
	{ user, activities } = toRefs(props);
</script>

<template>
	<div class="userSection">
		<!-- Needed? -->
		<span></span>
		<Username :user="user" />
		<CustomStatus :activities="activities" />
		<div class="divider" />
		<div class="scroller">
			<AboutMe :user="user" />
		</div>
	</div>
</template>

<style>
.userSection {
	display: flex;
	position: relative;
	flex-direction: column;
	overflow: hidden;
	border-radius: var(--radius-sm);
	background-color: var(--profile-body-background-color);
	margin: 28px 16px 16px;
	max-height: calc(
		100vh - 128px - var(--custom-user-popout-outside-components-height)
	);
}

.divider {
	margin: 12px 12px 0;
	height: 1px;
	position: sticky;
	top: 0;
	background-color: var(--profile-body-divider-color);
}

.scroller {
	overflow: hidden scroll;
	padding-right: 4px;
	flex: 0 1 auto;
	min-height: 0;
	padding: 0 12px;
	position: relative;
	box-sizing: border-box;
}
</style>
