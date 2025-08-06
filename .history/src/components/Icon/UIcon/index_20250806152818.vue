<template></template>
<script setup lang="ts">
import { IconConfig } from "./config";

withDefaults(defineProps<IconConfig>(), {
  size: 16,
  color: "#000"
});
</script>
<style lang="scss" scoped></style>
