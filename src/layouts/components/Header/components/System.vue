<template>
  <div class="system" @click="visible = true">
    <el-tooltip content="系统设置" placement="bottom" effect="light">
      <i class="iconfont icon-shezhi toolBar-icon" />
    </el-tooltip>
  </div>
  <teleport to="#app">
    <ThemeDrawer v-model="visible" />
  </teleport>
</template>
<script setup lang="ts">
import ThemeDrawer from "@/layouts/components/ThemeDrawer/index.vue";

const visible = ref(false);
</script>
