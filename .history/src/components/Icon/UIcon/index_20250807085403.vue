<template>
  <Icon :icon="getIcon" width="1em" height="1em" :color="color" v-bind="bindAttrs" />
</template>
<script setup lang="ts">
import { IconConfig } from "./config";
import { Icon } from "@iconify/vue";

const props = withDefaults(defineProps<IconConfig>(), {
  size: 0,
  color: "#000"
});

const attrs = useAttrs();

const bindAttrs = computed<{ class: string; style: string }>(() => ({
  class: (attrs.class as string) || "",
  style: (attrs.style as string) || ""
}));

const getIcon = computed(() => {
  const [collection, icon] = props.icon.split(":");
  return `${collection}:${icon}`;
});
</script>
<style lang="scss" scoped></style>
