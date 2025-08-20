<template>
  <div class="maximize-icon">
    <i class="iconfont icon-tuichu !text-18px absolute top-50% right-50%" />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.maximize-icon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99999;
  width: 55px;
  height: 55px;
  color: var(--el-color-white);
  cursor: pointer;
  background-color: var(--el-color-info-light-5);
  border-radius: 50%;
  transform: translate(40%, -40%);
}
</style>
