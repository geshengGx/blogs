<template>
  <di class="flex-center">
    <el-breadcrumb :separator-icon="ArrowRight">
      <Transition-group name="el-fade-in">
        <el-breadcrumb-item v-for="item in 5" :key="item" :to="{ path: '/' }">
          <u-icon icon="local:info" class="w-18px h-18px" />
          <span>菜单一</span>
        </el-breadcrumb-item>
      </Transition-group>
    </el-breadcrumb>
  </di>
</template>
<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
</script>
<style lang="scss" scoped>
:deep(.el-breadcrumb__item) {
  .el-breadcrumb__inner {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    color: var(--el-text-color-regular);
    transition: color 0.3s;
  }
  &:hover {
    .el-breadcrumb__inner {
      color: var(--el-color-primary);
    }
  }
}
</style>
