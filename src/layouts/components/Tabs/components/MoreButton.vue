<template>
  <el-dropdown trigger="click" :teleported="false">
    <div class="w-40px flex-center b-l-1px b-l-solid b-l-[#f0f0f0]">
      <ArrowDown :class="'w-20px h-20px'" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <el-icon><Refresh /></el-icon>刷新
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><FullScreen /></el-icon>最大化
        </el-dropdown-item>
        <el-dropdown-item divided>
          <el-icon><Remove /></el-icon>关闭当前
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><DArrowLeft /></el-icon>关闭左侧
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><DArrowRight /></el-icon>关闭右侧
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><CircleClose /></el-icon>关闭其它
        </el-dropdown-item>
        <el-dropdown-item>
          <el-icon><FolderDelete /></el-icon>关闭所有
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { ArrowDown, Refresh, FullScreen, Remove, DArrowLeft, DArrowRight, CircleClose, FolderDelete } from "@element-plus/icons-vue";
</script>
