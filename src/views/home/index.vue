<template>
  <textarea v-model="value" class="markdown-textarea"></textarea>
  <div v-html="compiledMarkdown" class="markdown-body" v-highlight></div>
</template>
<script lang="ts" setup>
import { marked } from "marked";

const value = ref("**Hello,World**");

const compiledMarkdown = computed(() => {
  return marked(value.value);
});
</script>
<style></style>
