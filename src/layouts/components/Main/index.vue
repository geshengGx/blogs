<template>
  <Tabs />
  <div class="layout_main">
    <!-- <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="[]">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view> -->
  </div>
  <Footer />
</template>
<script setup lang="ts">
import Tabs from "../Tabs/index.vue";
import Footer from "../Footer/index.vue";
</script>

<style lang="scss" scoped>
.layout_main {
  width: 100%;
  height: calc(100% - 121px);
  padding: 10px;
}
</style>
