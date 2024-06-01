<script setup lang="ts">
import {
	defaultUserCardProperties,
	DiscordUserCardProperties,
} from "discord-user-card";
import { withDefaults } from "vue";

withDefaults(
	defineProps<DiscordUserCardProperties & { style?: "Original" }>(),
	{
		user: () => defaultUserCardProperties.user,
		activities: () => defaultUserCardProperties.activities,
		style: "Original",
	}
);
</script>

<template>
	<Suspense>
		<template v-if="style === 'Original'">
			<div>Original</div>
		</template>
	</Suspense>
</template>
