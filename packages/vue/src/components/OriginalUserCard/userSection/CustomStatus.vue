<script setup lang="ts">
import {
	type DiscordUserCardActivity,
	ActivityType,
	imageToUrl,
	findEmoji,
	type DiscordUserCardActivityCustom,
} from "@discord-user-card/core";
import { computed } from "vue";

const props = defineProps<{ activities: DiscordUserCardActivity[] }>();
const customStatus = computed(() => {
	const activity = props.activities.find(
		(activity): activity is DiscordUserCardActivityCustom =>
			activity.type === ActivityType.Custom
	);
	if (!activity) return undefined;

	let emoji:
		| {
				name: string;
				url: string;
		  }
		| undefined;
	if (activity.emoji && "id" in activity.emoji) {
		emoji = {
			name: activity.emoji.name,
			url: imageToUrl({
				scope: "emojis",
				image: activity.emoji,
			}),
		};
	} else if (activity.emoji) {
		const foundEmoji = findEmoji(activity.emoji.name);
		if (foundEmoji) {
			emoji = {
				name: foundEmoji.names[0],
				url: foundEmoji.asset,
			};
		}
	}

	return {
		emoji,
		state: activity.state,
	};
});
</script>

<template>
	<div class="customStatusSection" v-if="customStatus">
		<div class="customStatus">
			<img
				v-if="customStatus.emoji"
				class="customStatusImg"
				:src="customStatus.emoji.url"
				:alt="customStatus.emoji.name"
			/>
			<span v-if="customStatus.state" class="customStatusText">{{
				customStatus.state
			}}</span>
		</div>
	</div>
</template>

<style scoped>
.customStatusSection {
	padding-top: 12px;
	padding-right: 12px;
	padding-left: 12px;
}

.customStatusSection {
	box-sizing: border-box;
	position: relative;
	width: 100%;
	word-wrap: break-word;
	font-size: 14px;
	line-height: 18px;
	color: var(--text-normal);
}

.customStatusImg {
	display: block;
	margin: -1px 4px -1px 0;
	float: left;
	width: 20px;
	height: 20px;
	-o-object-fit: contain;
	object-fit: contain;
}

.customStatusText {
	user-select: text;
}
</style>
