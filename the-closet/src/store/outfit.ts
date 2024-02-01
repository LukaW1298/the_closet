import { Clothing, ClothingImage, ClothingMaterial } from "@/custom_types";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getOutfits } from "../composables/GetCalls";

export const useOutfitListStore = defineStore("outfitList", () => {
  const outfits = ref([]);

  function fetch() {
    getOutfits().then((result) => {
      outfits.value = result;
      console.log(result)
    });
  }

  return {
    outfits,
    fetch
  };
});