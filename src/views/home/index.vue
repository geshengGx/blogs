<template>
  <div class="card wh-full">
    <el-button @click="open">弹框1</el-button>
  </div>
  <form-container ref="FormContainerref" :title="'弹框1'" v-model="visible"></form-container>
</template>
<script setup lang="ts" name="Home">
const FormContainerref = ref(null);

const visible = ref(false);
const open = () => {
  // FormContainerref.value?.open();
  visible.value = true;
};
</script>
