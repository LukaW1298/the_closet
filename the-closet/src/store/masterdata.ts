import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Brand, Material, WashingMode, Status, Color } from "@/custom_types";
import { getBrands, getMaterials, getWashingModes, getStatus, getColors } from "@/composables/GetCalls";

export const useBrandsStore = defineStore("brands", () => {
    const brands = ref<Brand[]>([]);

    const isEmpty = computed(() => brands.value.length == 0);

    function fetch() {
        getBrands().then((result) => {
            brands.value = result;
        })
    }

    return { brands, isEmpty, fetch };
})

export const useMaterialsStore = defineStore("materials", () => {
    const materials = ref<Material[]>([]);

    const isEmpty = computed(() => materials.value.length == 0);

    function fetch() {
        getMaterials().then((result): void => {
            materials.value = result;
            console.log("materials:", result)
        })
    }

    return { materials, isEmpty, fetch };
})

export const useWashingModeStore = defineStore("washingModes", () => {
    const washingModes = ref<WashingMode[]>([]);

    const isEmpty = computed(() => washingModes.value.length == 0);

    function fetch() {
        getWashingModes().then((result): void => {
            washingModes.value = result;

            console.log("washing modes", result)
        })
    }

    return { washingModes, isEmpty, fetch };
})

export const useStatusStore = defineStore("statusList", () => {
    const statusList = ref<Status[]>([]);

    const isEmpty = computed(() => statusList.value.length == 0);

    function fetch() {
        getStatus().then((result) => {
            statusList.value = result;
        })
    }

    return { statusList, isEmpty, fetch };
 })


 export const useColorStore = defineStore("colors", () => {
    const colors = ref<Color[]>([]);

    const isEmpty = computed(() => colors.value.length == 0);

    function fetch() {
        getColors().then((result) => {
            colors.value = result;
        })
    }

    return { colors, isEmpty, fetch };
 })