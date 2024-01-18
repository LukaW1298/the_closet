import { defineStore } from "pinia";
import { ref, computed } from "vue";
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
        // eslint-disable-next-line unicorn/no-array-reduce
        return categories.value.reduce((accumulator: ParentCategory[], curVal) => {
            const parentCategoryElement: ParentCategory | undefined = accumulator.find((el: ParentCategory) => {
                return el.id == curVal.parentCategory.id;
            });
        
            if (parentCategoryElement === undefined) {
                const obj = curVal.parentCategory;
                obj["children"] = [curVal];
                obj.name = obj.type;
        
                accumulator.push(obj);
            }
            else if (parentCategoryElement.children === undefined) {
                parentCategoryElement.children = [curVal];
                parentCategoryElement.name = parentCategoryElement.type;
            }
            else {
                parentCategoryElement.children.push(curVal);
                parentCategoryElement.name = parentCategoryElement.type;
            }

        
        
            return accumulator;
        }, []);
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