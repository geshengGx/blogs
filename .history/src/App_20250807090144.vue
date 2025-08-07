<script setup lang="ts">
const bit = h(IconLocal:info);
</script>

<template>
  <!-- <icon-mdi:account style="font-size: 14px; color: red" /> -->
  <!-- <icon-local:info style="font-size: 20px; color: #00ff00" /> -->
  <u-icon icon="mdi:account" :size="14" color="red" />
  <div class="w-10 h-10 bg-red-500 shadow-5"></div>
  <div class="w-10 h-10 card bg-primary"></div>
  <component :is="bit" />
</template>

<style scoped></style>
