<template>
  <div class="drawer-item">
    <div class="drawer-item-title">
      <u-icon :icon="icon" v-if="icon" />
      <div class="text" v-if="title">{{ title }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  icon?: string;
}>();
</script>
<style scoped lang="scss">
.drawer-item {
  position: relative;
  padding-top: 20px;
  margin-bottom: 20px;
  border-top: 1px solid var(--el-border-color-lighter);
  .drawer-item-title {
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    background: var(--el-bg-color);
    transform: translate(-50%, -50%);
    .text {
      margin-bottom: 2px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
