<template>
  <Maximize v-if="isMaximize" />
  <Tabs />
  <div class="layout_main" :class="{ maximize: isMaximize }">
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="[]">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <Footer />
</template>
<script setup lang="ts">
import Tabs from "../Tabs/index.vue";
import Footer from "../Footer/index.vue";
import Maximize from "./components/Maximize.vue";

const isMaximize = ref(false);
</script>

<style lang="scss" scoped>
.layout_main {
  width: 100%;
  height: calc(100% - 121px);
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page);
}
.maximize {
  position: absolute;
  inset: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
}
</style>
