<template>
  <component
    :is="getIcon"
    :style="{
      fontSize: typeof size === 'number' ? `${size}px` : size,
      color: color
    }"
  ></component>
</template>
<script setup lang="ts">
import { IconConfig } from "./config";

const props = withDefaults(defineProps<IconConfig>(), {
  size: 16,
  color: "#000"
});

const getIcon = () => {
  const [collection, icon] = props.icon.split(":");
  return `icon-${collection}-${icon}`;
};
</script>
<style lang="scss" scoped></style>
