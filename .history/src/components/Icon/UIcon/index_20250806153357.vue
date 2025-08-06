<template>
  <component :is="getIcon" :size="size" :color="color"></component>
</template>
<script setup lang="ts">
import { IconConfig } from "./config";

const props = withDefaults(defineProps<IconConfig>(), {
  size: 16,
  color: "#000"
});

const getIcon = () => {
  const [collection, icon] = props.name.split(":");
  return `icon-${props.icon}`;
};
</script>
<style lang="scss" scoped></style>
