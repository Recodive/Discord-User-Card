<script setup lang="ts">
import "discord-user-card/style.css";
import type {
	DiscordUserCardProperties,
} from "discord-user-card";
import setupDiscordUserCard, {
	defaultUserCardProperties,
} from "discord-user-card";
import { onBeforeUnmount, ref, toRefs, watch, withDefaults } from "vue";

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
const { user, activities } = toRefs(props);

const div = ref<HTMLDivElement>(document.createElement("div"));
let renderer = setupDiscordUserCard(div.value, {
	style: props.style,
	type: props.type,
});

await renderer.render({
	user: user.value,
	activities: activities.value,
});

const innerHTML = ref(div.value.innerHTML);
const styles = ref(div.value.style.cssText);
const classes = ref(div.value.className);
const ariaLabel = ref(div.value.getAttribute("aria-label"));

function updateRefs() {
	innerHTML.value = div.value.innerHTML;
	styles.value = div.value.style.cssText;
	classes.value = div.value.className;
	ariaLabel.value = div.value.getAttribute("aria-label");
}

watch(
	[user, activities],
	async () => {
		await renderer.render({
			user: user.value,
			activities: activities.value,
		});
		updateRefs();
	},
	{ deep: true },
);

watch(
	[props.style, props.type],
	async () => {
		renderer.destroy();
		renderer = setupDiscordUserCard(div.value, {
			style: props.style,
			type: props.type,
		});
		await renderer.render({
			user: user.value,
			activities: activities.value,
		});
		updateRefs();
	},
	{ deep: true },
);

onBeforeUnmount(() => {
	renderer.destroy();
});
</script>

<template>
	<div
		:class="classes"
		:style="styles"
		:aria-label="ariaLabel || undefined"
		v-html="innerHTML"
	/>
</template>
