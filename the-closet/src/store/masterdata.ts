import { defineStore } from "pinia";
import { ref, computed, unref } from "vue";
import { Brand, Material, WashingMode, Status, Color, Category, ParentCategory } from "@/custom_types";
import { getBrands, getMaterials, getWashingModes, getStatus, getColors, getCategories } from "@/composables/GetCalls";
import testdata from '@/../resources/test_data/masterdata.json';

export const useBrandsStore = defineStore("brands", () => {
  const brands = ref<Brand[]>([]);

  const isEmpty = computed(() => {
    return brands.value.length === 0;
  });

  function fetch() {
    getBrands().then((result) => {
      brands.value = result;
    });
  }

  return {
    brands,
    isEmpty,
    fetch 
  };
});

export const useMaterialsStore = defineStore("materials", () => {
  const materials = ref<Material[]>([]);

  const isEmpty = computed(() => {
    return materials.value.length === 0;
  });

  function fetch() {
    getMaterials().then((result): void => {
      materials.value = result;
      console.log("materials:", result);
    });
  }

  return {
    materials,
    isEmpty,
    fetch 
  };
});

export const useWashingModeStore = defineStore("washingModes", () => {
  const washingModes = ref<WashingMode[]>([]);

  const isEmpty = computed(() => {
    return washingModes.value.length === 0;
  });

  function fetch() {
    getWashingModes().then((result): void => {
      washingModes.value = result;

      console.log("washing modes", result);
    });
  }

  return {
    washingModes,
    isEmpty,
    fetch 
  };
});

export const useStatusStore = defineStore("statusList", () => {
  const statusList = ref<Status[]>([]);

  const isEmpty = computed(() => {
    return statusList.value.length === 0;
  });

  function fetch() {
    getStatus().then((result) => {
      statusList.value = result;
    });
  }

  return {
    statusList,
    isEmpty,
    fetch 
  };
});


export const useColorStore = defineStore("colors", () => {
  const colors = ref<Color[]>([]);

  const isEmpty = computed(() => {
    return colors.value.length === 0;
  });

  function fetch() {
    getColors().then((result) => {
      colors.value = result;
    });
  }

  return {
    colors,
    isEmpty,
    fetch 
  };
});


export const useCategoryStore = defineStore("category", () => {
  const categories = ref<Category[]>([]);

  const isEmpty = computed(() => {
    return categories.value.length === 0;
  });

  const tree = computed(() => {

    const parentCategories = [];

    for (const category of categories.value) {
      const parentCatEl = parentCategories.find((el) => {
        return el.key === category.parentCategory.id;
      });

      if (parentCatEl == undefined) {
        parentCategories.push({
          key: category.parentCategory.id,
          label: category.parentCategory.type,
          selectable: false,
          children: [ {
            key: category.id,
            label: category.type
          } ]
        });
      }
      else {
        parentCatEl.children.push({
          key: category.id,
          label: category.type
        });
      }
    }
        
    return parentCategories;
  });

  function fetch() {
    getCategories().then((result) => {
      categories.value = result;
    });
  }

  return {
    categories,
    isEmpty,
    fetch,
    tree
  };
});