<script setup lang="ts">
import {
	defaultUserCardProperties,
	DiscordUserCardProperties,
} from "discord-user-card";
import { withDefaults } from "vue";
import Original from "./Original.vue";

withDefaults(
	defineProps<DiscordUserCardProperties & { style?: "Original" }>(),
	{
		user: () => defaultUserCardProperties.user,
		activities: () => defaultUserCardProperties.activities,
		style: "Original",
		theme: "dark",
	}
);
</script>

<template>
	<Suspense>
		<template v-if="style === 'Original'">
			<Original :activities="activities" :user="user" :theme="theme" />
		</template>
	</Suspense>
</template>
