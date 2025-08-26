import { defineStore } from "pinia";
import { StorageType } from "@/stores/helper/storage";

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
    persist: [
      {
        key: "sy1",
        pick: ["a", "b", "c"],
        storage: StorageType.COOKIE,
        expire: 1000 * 10
      },
      {
        key: "sy2",
        storage: StorageType.SESSION,
        omit: ["a"]
      },
      {
        key: "sy3",
        storage: StorageType.LOCAL,
        omit: ["a"]
      }
    ]
  }
);
