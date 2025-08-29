<template>
  <!-- 对话框 -->
  <el-dialog v-model="visible" :destroy-on-close="true" @close="close" :draggable="true" v-bind="$attrs" :width="width" v-if="!formDrawer">
    <template v-for="slotKey in slotKeys" #[slotKey]> <slot :name="slotKey" /></template>
  </el-dialog>
  <!-- 抽屉 -->
  <el-drawer v-model="visible" :destroy-on-close="true" @close="close" v-bind="$attrs" :size="width" v-else>
    <template v-for="slotKey in slotKeys" #[slotKey]> <slot :name="slotKey" /></template>
  </el-drawer>
</template>
<script setup lang="ts">
interface Props {
  auto?: boolean; // 是否自动切换抽屉和对话框
  drawer?: boolean; // 是否使用抽屉
  width?: string | number; // 宽度
}

const props = withDefaults(defineProps<Props>(), {
  auto: true,
  drawer: false,
  width: "600px"
});

const emit = defineEmits({ close: null }); // 自定义事件

const visible = ref(false);

const formDrawer = computed(() => {
  const { auto, drawer } = props;
  return auto ? false : drawer;
});

const instance = getCurrentInstance(); // 当前实例
const slotKeys = computed(() => Object.keys(instance?.slots || [])); // 插槽名称列表
// 关闭抽屉
const close = () => {
  emit("close");
};
</script>
<style lang="scss" scoped></style>
