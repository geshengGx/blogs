<template>
  <div class="toolbar-right">
    <div class="h-full bg-[#fff] flex-x-center justify-end gap-10px">
      <SearchMenu />
      <System />
      <Message />
      <Fullscreen />
      <Avatar />
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from "./components/Avatar.vue";
import Fullscreen from "./components/Fullscreen.vue";
import Message from "./components/Message.vue";
import System from "./components/System.vue";
import SearchMenu from "./components/SearchMenu.vue";
</script>

<style scoped lang="scss">
.toolbar-right {
  position: absolute;
  top: 0;
  right: 20px;
  height: 100%;
  padding-left: 26px;
  background-color: rgb(255 255 255 / 70%);
  backdrop-filter: blur(1px);
}
</style>
