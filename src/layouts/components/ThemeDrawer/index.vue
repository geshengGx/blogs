<template>
  <FormContainer v-model="visible" :width="300" :drawer="true" :auto="false">
    <item :title="'标题1'" :icon="'ep:document'">
      <div class="h-200px">内容1</div>
    </item>
    <item :title="'标题2'" :icon="'local:info'">
      <div class="h-200px">内容1</div>
    </item>
    <item :title="'标题3'" :icon="'ep:user'">
      <div class="h-200px">内容1</div>
    </item>
  </FormContainer>
</template>
<script setup lang="ts">
import item from "./components/DrawerItem.vue";

const visible = ref(false);
</script>
