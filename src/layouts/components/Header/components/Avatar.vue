<template>
  <div class="flex-center gap-10px mr-10px">
    <span class="text-[14px] font-bold">后台管理系统</span>
    <el-dropdown placement="bottom" trigger="click">
      <img src="/public//vite.svg" alt="头像" class="w-[30px] h-[30px]" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts"></script>
