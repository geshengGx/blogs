<template>
  <div class="card wh-full">
    <el-button @click="sy.setSy">获取数据1</el-button>
    <el-button @click="get">获取数据2</el-button>
    <el-button @click="del">删除数据</el-button>
    <hr />
    <el-button @click="sy2.setSy">获取数据1</el-button>
    <el-button @click="get2">获取数据2</el-button>
    <el-button @click="del2">删除数据</el-button>
  </div>
</template>
<script setup lang="ts" name="Home">
import { useSyStore } from "@/stores/modules/sy";
import { useSyStore2 } from "@/stores/modules/sy2";
import { storage } from "@/stores/helper/storage";

const sy = useSyStore();
const sy2 = useSyStore2();

const get = () => {
  console.log("数据===========》", sy.a, sy.b);
  console.log("数据2===========》", storage.get("sy_sy1"));
};

const del = () => {
  // storage.remove("sy_sy2");

  console.log("数据2===========》", storage.clear());
};

const get2 = () => {
  console.log("数据222===========》", sy2.a1, sy2.b2);
  console.log("数据222===========》", storage.get("sy_sy1"));
};

const del2 = () => {
  // storage.remove("sy_sy2");

  console.log("数据2222===========》", storage.clear());
};

onMounted(() => {
  console.log("数据11===========》", sy.a, sy.b);
  console.log("数据22===========》", sy2.a1, sy2.b2);
});
</script>
