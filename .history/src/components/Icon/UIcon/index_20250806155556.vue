<template>
  <Icon :icon="getIcon" :color="color" :width="size" :height="size" />
</template>
<script setup lang="ts">
import { IconConfig } from "./config";
import { Icon } from "@iconify/vue";

const props = withDefaults(defineProps<IconConfig>(), {
  size: 16,
  color: "#000"
});

const getIcon = computed(() => {
  const [collection, icon] = props.icon.split(":");
  return `icon-${collection}:${icon}`;
});
</script>
<style lang="scss" scoped></style>
