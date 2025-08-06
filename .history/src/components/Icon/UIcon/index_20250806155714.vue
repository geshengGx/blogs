<template>
  <Icon :icon="getIcon" width="1em" height="1em" v-bind="bindAttrs" />
</template>
<script setup lang="ts">
import { IconConfig } from "./config";
import { Icon } from "@iconify/vue";

const props = withDefaults(defineProps<IconConfig>(), {
  size: 16,
  color: "#000"
});

const attrs = useAttrs();

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || "",
  style: (attrs.style as string) || ""
}));

const getIcon = computed(() => {
  const [collection, icon] = props.icon.split(":");
  return `icon-${collection}:${icon}`;
});
</script>
<style lang="scss" scoped></style>
