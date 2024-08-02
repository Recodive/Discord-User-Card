<script setup lang="ts">
import type { DiscordUserCardProperties } from "discord-user-card";
import { defaultUserCardProperties } from "discord-user-card";
import { toRefs } from "vue";

import DiscordUserCard from "./DiscordUserCard.vue";
import DiscordUserCardSkeleton from "./DiscordUserCardSkeleton.vue";

const props = withDefaults(
	defineProps<DiscordUserCardProperties & {
		style?: "original";
		type?: "card" | "profile";
	}>(),
	{
		user: () => defaultUserCardProperties.user,
		activities: () => defaultUserCardProperties.activities,
		style: "original",
		type: "card",
	},
);
const { user, activities, style, type } = toRefs(props);
</script>

<template>
	<Suspense>
		<template #default>
			<DiscordUserCard :activities="activities" :style="style" :type="type" :user="user" />
		</template>
		<template #fallback>
			<DiscordUserCardSkeleton :activities="activities" :style="style" :type="type" :user="user" />
		</template>
	</Suspense>
</template>
