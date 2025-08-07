<template>
  <Icon :icon="getIcon" width="1em" height="1em" :color="color" v-bind="bindAttrs" />
</template>
<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";
import type { IconConfig } from "./config";

const props = withDefaults(defineProps<IconConfig>(), {
  size: 16,
  color: "#000"
});

// 动态导入图标组件
const iconComponent = computed(() => {
  const [collection, icon] = props.icon.split(":");

  // 根据图标集返回不同的组件
  switch (collection) {
    case "mdi":
      return defineAsyncComponent(() =>
        import(`unplugin-icons/vue`).then(m => m[`IconMdi${icon.replace(/-/g, "").replace(/(^\w|\s\w)/g, m => m.toUpperCase())}`])
      );
    case "local":
      return defineAsyncComponent(() =>
        import(`unplugin-icons/vue`).then(m => m[`IconLocal${icon.replace(/-/g, "").replace(/(^\w|\s\w)/g, m => m.toUpperCase())}`])
      );
    default:
      return null;
  }
});

const iconStyle = computed(() => ({
  fontSize: typeof props.size === "number" ? `${props.size}px` : props.size,
  color: props.color,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
}));
</script>
<style lang="scss" scoped></style>
