@ -1,80 +0,0 @@
<script setup lang="ts">
import {
	DiscordUserCardProperties,
	setupOriginalDiscordUserCard,
} from "discord-user-card";
import { watch, toRefs, ref, computed } from "vue";

const props = defineProps<Required<DiscordUserCardProperties>>(),
	{ user, activities } = toRefs(props);

const div = ref<HTMLDivElement>(document.createElement("div"));
const renderer = setupOriginalDiscordUserCard(div.value);

await renderer.render({
	user: user.value,
	activities: activities.value,
});

watch(
	[user, activities],
	() => {
		renderer.render({
			user: user.value,
			activities: activities.value,
		});
	},
	{ deep: true }
);

const innerHTML = computed(() => div.value.innerHTML);
const styles = computed(() => div.value.style.cssText);
const classes = computed(() => div.value.className);
const ariaLabel = computed(() => div.value.getAttribute("aria-label"));
</script>

<template>
	<div
		:class="classes"
		:style="styles"
		:aria-label="ariaLabel || undefined"
		v-html="innerHTML"
	/>
</template>
