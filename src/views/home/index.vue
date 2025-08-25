<template>
  <div class="card wh-full">
    <el-button @click="sy.setSy">获取数据1</el-button>
    <el-button @click="get">获取数据2</el-button>
  </div>
</template>
<script setup lang="ts" name="Home">
import { useSyStore } from "@/stores/modules/sy";

const sy = useSyStore();

const get = () => {
  console.log("数据===========》", sy.a, sy.b);
};

onMounted(() => {
  console.log("数据===========》", sy.a, sy.b);
});
</script>
