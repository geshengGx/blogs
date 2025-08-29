<template>
  <FormContainer v-model="visible" :width="300" :drawer="true" :auto="false"> </FormContainer>
</template>
<script setup lang="ts">
const visible = ref(false);
</script>
