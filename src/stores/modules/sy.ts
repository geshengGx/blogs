import { defineStore } from "pinia";

export const useSyStore = defineStore(
  "sy",
  () => {
    const a = ref(1);
    const b = ref(1);

    const setSy = () => {
      a.value++;
      b.value++;
    };

    return {
      a,
      b,
      setSy
    };
  },
  {
    persist: [
      {
        key: "sy1",
        pick: ["a", "b", "c"]
      },
      {
        key: "sy2",
        omit: ["a"],
        expire: 1000 * 10
      }
    ]
  }
);
