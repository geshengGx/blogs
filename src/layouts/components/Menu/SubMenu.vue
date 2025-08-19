<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <u-icon v-if="subItem.meta.icon" :icon="subItem.meta.icon" class="el-icon" />
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path">
      <u-icon v-if="subItem.meta.icon" :icon="subItem.meta.icon" class="el-icon" />
      <template #title>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
defineProps<{ menuList: Menu.MenuOptions[] }>();
</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  background-color: transparent !important;
}
.el-menu-item {
  position: relative;
  box-sizing: border-box;
  &:hover {
    background-color: var(--el-color-info-light-7);
  }
  &.is-active {
    background-color: var(--el-color-primary-light-9);
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 3px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
</style>
