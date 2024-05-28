<script setup lang="ts">
import { defaultUserCardProperties, DiscordUserCardProperties } from "@discord-user-card/core";
import Original from "./OriginalUserCard/Original.vue";
import { withDefaults } from "vue";

withDefaults(defineProps<DiscordUserCardProperties & {style?: "Original"}>(), {
	user: () => defaultUserCardProperties.user,
	activities: () => defaultUserCardProperties.activities,
	style: "Original"
});
</script>

<template>
	<template v-if="style === 'Original'">
		<Original :user="user" :activities="activities"/>
	</template>
</template>
