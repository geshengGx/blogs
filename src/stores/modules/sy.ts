import { defineStore } from "pinia";
import { StorageType } from "@/stores/helper/storage";

export const useSyStore = defineStore(
  "sy",
  () => {
    const a = ref(1);
    const b = ref(1);
    const c = ref(1);
    const d = ref(1);

    const setSy = () => {
      a.value++;
      b.value++;
      // c.value++;
      // d.value++;
    };

    return {
      a,
      b,
      c,
      d,
      setSy
    };
  },
  {
    persist: [
      {
        key: "sy1",
        pick: ["a", "b", "e"],
        storage: StorageType.COOKIE,
        expire: 1000 * 10
      },
      {
        key: "sy2",
        storage: StorageType.SESSION,
        pick: ["a", "b", "c"],
        omit: ["e"],
        expire: 1000 * 10
      },
      {
        key: "sy3",
        storage: StorageType.LOCAL,
        pick: ["a", "b", "c"],
        omit: ["a"],
        expire: 1000 * 10
      },
      {
        key: "sy4",
        storage: StorageType.LOCAL,
        omit: ["a", "b", "c"],
        expire: 1000 * 10
      },
      {
        key: "sy5",
        storage: StorageType.LOCAL,
        expire: 1000 * 10
      }
    ]
  }
);
