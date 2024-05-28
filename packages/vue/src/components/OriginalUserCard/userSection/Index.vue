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
		<div class="duc_divider" />
		<div class="duc_scroller">
			<AboutMe :user="user" />
		</div>
	</div>
</template>
