<!-- 分栏布局 -->
<template>
  <div class="w-100vw h-100vh xl:layout-columns-xl xs:layout-columns-xs">
    <div class="bg-emerald">11111222ddddddff</div>
    <div class="bg-red">
      <el-button>Default</el-button>
      <el-button type="primary" :style="{ width: '40px' }">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
  </div>
  <!-- <div class="xy">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div> -->
</template>
<script setup lang="ts">
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];
</script>
<style scoped lang="scss">
.xy {
  width: 200px;
  height: 200px;
  background-color: rgb(231 198 198);
}
</style>
