import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useWardrobeModeStore = defineStore("WardrobeMode", () => {
  const mode = ref<"outfitSelection" | "view">("view");

  const outfitSelectionMode = computed(() => {
    return mode.value == "outfitSelection";
  });

  const viewingMode = computed(() => {
    return mode.value == "view";
  });

  function changeToOutfitSelection () {
    mode.value = "outfitSelection";
  }

  function changeToView () {
    mode.value = "view";
  }

  return {
    mode,
    outfitSelectionMode,
    viewingMode,
    changeToOutfitSelection,
    changeToView
  };
});