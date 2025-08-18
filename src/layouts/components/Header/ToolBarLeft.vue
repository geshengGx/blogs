<template>
  <div class="toolbar-left">
    <CollapseIcon />
    <Breadcrumb />
  </div>
</template>

<script setup lang="ts">
import CollapseIcon from "./components/CollapseIcon.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
</script>

<style scoped lang="scss">
.toolbar-left {
  position: absolute;
  top: 0;
  left: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: start;
  width: 50%;
  min-width: 500px;
  height: 100%;
}
</style>
