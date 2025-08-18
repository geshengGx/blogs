<template>
  <div class="message">
    <el-popover :width="300">
      <template #reference>
        <i class="iconfont icon-xiaoxi toolBar-icon" />
      </template>
      <template #default>
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
          <el-tab-pane label="消息" name="first">User</el-tab-pane>
          <el-tab-pane label="通知" name="second">Config</el-tab-pane>
          <el-tab-pane label="公告" name="third">Role</el-tab-pane>
        </el-tabs>
      </template>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
