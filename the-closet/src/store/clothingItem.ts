import { Category, ChildCategory, ClothingItem } from "@/custom_types";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getClothings } from "@/composables/GetCalls";


export const useClothingListStore = defineStore("clothingList", () => {
    const clothings = ref<ClothingItem[]>([]);

    const isEmpty = computed(() => {
        return clothings.value.length === 0;
    })

    function fetch() {
        getClothings().then((result) => {
            clothings.value = result;
        });
    }

    return {
        clothings,
        isEmpty,
        fetch
    }
});

const emptyClothingObject: ClothingItem = {
    id: -1,
    name: "",
    size: "",
    price: 0,
    notes: "",
    color: {
        "id": 0,
        "name": "white",
        "hexCode": "#ffffff"
    },
    brand: {
        "id": -1,
        "name": ""
    },
    category: {
        "id": 56,
        "type": "v-neck",
        "parentCategory": {
            "id": 1,
            "type": "t-shirt"
        }
    },
    status: {
        id: 1,
        "status": "clean"
    },
    washingMode: {
        "id": 1,
        "washingMode": "40 degrees, colors"
    },
    user: {
        "id": 1,
        "username": "test"
    },
    image: {
        id: -1,
        url: ""
    },
    material: [
        {
            "id": 19,
            "material": "Cotton"
        }
    ]
};

export const useClothingStore = defineStore("clothingItem", () => {

    const clothingItem = ref<ClothingItem>({...emptyClothingObject});

    function updateClothingItem(newItem: ClothingItem) {
        clothingItem.value = newItem;
    }

    function updateCategory(newCategory: ChildCategory) {
        clothingItem.value.category = newCategory;
    }

    function clear() {
        clothingItem.value = {...emptyClothingObject};
    }

    return {
        clothingItem,
        updateClothingItem,
        updateCategory,
        clear
    };

});