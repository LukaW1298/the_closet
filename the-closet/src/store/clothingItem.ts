import { Category, ChildCategory, ClothingItem } from "@/custom_types";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useClothingItemStore = defineStore("clothingItem", () => {

    const clothingItem = ref<ClothingItem>({
        id: -1,
        name: "",
        size: "",
        price: -1,
        notes: "",
        color: {
            "id": 0,
            "name": "white",
            "hex_code": "#ffffff"
        },
        brand: {
            "id": 1,
            "name": "UpdatedBrand"
        },
        category: {
            "id": 200,
            "type": "knit dress",
            "parentCategory": {
                "id": 2,
                "type": "top"
            }
        },
        status: {
            id: 3,
            "status": "dirty"
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
            "id": 1,
            "url": "/resources/test_items/clothing1.png"
        },
        materials: [
            {
                "id": 10,
                "material": "Denim"
            }
        ]
    });

    function updateClothingItem(newItem: ClothingItem) {
        clothingItem.value = newItem;
    }

    function updateCategory(newCategory: ChildCategory) {
        clothingItem.value.category = newCategory;
    }

    return {
        clothingItem,
        updateClothingItem,
        updateCategory
    };

});