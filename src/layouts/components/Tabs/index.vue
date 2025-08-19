<template>
  <div class="tabs">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick" :closable="true">
      <template v-for="item in 15" :key="item">
        <el-tab-pane :name="item">
          <template #label>
            <u-icon icon="local:info" class="text-15px mt-1.5px mr-4px" />
            <span class="text-15px">{{ `用户管理` }} </span>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
    <MoreButton />
  </div>
</template>
<script setup lang="ts">
import MoreButton from "./components/MoreButton.vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref(1);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  height: 40px;
  padding: 0 0 0 20px;
  line-height: 40px;
  background-color: var(--el-bg-color);
  border-bottom: 2px solid #f0f0f0;
  :deep(.el-tabs) {
    width: calc(100% - 50px);
    margin-right: 10px;
    .el-tabs__nav {
      border: none;
    }
    .el-tabs__item {
      color: var(--el-color-info-light-3);
      border-left: none;
    }
    .is-active {
      color: var(--el-color-primary);
      border-bottom: 2px solid var(--el-color-primary) !important;
    }
  }
}
</style>
