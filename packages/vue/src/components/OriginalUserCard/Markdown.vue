<script setup lang="ts">
import { toHTML } from "@discord-user-card/markdown";
import { computed } from "vue";

const props = defineProps<{ markdown: string }>();

const html = computed(() => toHTML(props.markdown));
</script>

<template>
	<div class="duc_markdown" v-html="html" />
</template>
