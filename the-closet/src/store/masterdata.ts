import {defineStore} from "pinia";
import {ref, computed, unref} from "vue";
import {
    ParentCategory,
    Brand,
    Material,
    WashingMode,
    Status,
    Color,
    Category,
    OutfitType,
    Occasion,
    Weather
} from "@/custom_types";
import {
    getBrands,
    getMaterials,
    getWashingModes,
    getStatus,
    getColors,
    getCategories,
    getWeathers,
    getOccasions,
    getOutfitTypes
} from "@/composables/GetCalls";

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

<<<<<<< Updated upstream
  const isEmpty = computed(() => {
    return categories.value.length === 0;
  });

  const tree = computed(() => {

    const parentCategories: ParentCategory[] = [];

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
=======
    const isEmpty = computed(() => {
        return categories.value.length === 0;
>>>>>>> Stashed changes
    });

    const tree = computed(() => {

        const parentCategories: ParentCategory[] = [];

        for (const category of categories.value) {
            const parentCatEl = parentCategories.find((el) => {
                return el.key === category.parentCategory.id;
            });

            if (parentCatEl == undefined) {
                parentCategories.push({
                    id: 0, name: "", type: "",
                    key: category.parentCategory.id,
                    label: category.parentCategory.type,
                    selectable: false,
                    children: [{
                        key: category.id,
                        label: category.type
                    }]
                });
            } else {
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


export const useWeatherStore = defineStore("weather", () => {
    const weathers = ref<Weather[]>([]);

    const isEmpty = computed(() => {
        return weathers.value.length === 0;
    });

    function fetch() {
        getWeathers().then((result) => {
            weathers.value = result;
        });
    }

    return {
        weathers,
        fetch,
        isEmpty
    };
});


export const useOccasionStore = defineStore("occasion", () => {
    const occasions = ref<Occasion[]>([]);

    const isEmpty = computed(() => {
        return occasions.value.length === 0;
    });

    function fetch() {
        getOccasions().then((result) => {
            occasions.value = result;
        });
    }

    return {
        occasions,
        isEmpty,
        fetch
    };
});


export const useOutfitTypeStore = defineStore("outfitType", () => {
    const outfitTypes = ref<OutfitType[]>([]);

    const isEmpty = computed(() => {
        return outfitTypes.value.length === 0;
    });

    function fetch() {
        getOutfitTypes().then((result) => {
            outfitTypes.value = result;
        });
    }

    return {
        outfitTypes,
        isEmpty,
        fetch
    };

});