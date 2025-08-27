import { defineStore } from "pinia";
// import { StorageType } from "@/stores/helper/storage";

export const useSyStore2 = defineStore(
  "sy2",
  () => {
    const a = ref(1);
    const b = ref(1);
    const c = ref(1);

    const setSy = () => {
      a.value++;
      b.value++;
      c.value++;
    };

    return {
      a1: a,
      b2: b,
      c,
      setSy
    };
  },
  {
    persist: true
  }
);
