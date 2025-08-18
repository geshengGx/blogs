<template>
  <div class="w-[20px] h-[20px] flex-center cursor-pointer">
    <icon-ep:expand class="wh-full" v-if="!isCollapse" />
    <icon-ep:fold class="wh-full" v-else />
  </div>
</template>
<script setup lang="ts">
const isCollapse = ref(true);
</script>
