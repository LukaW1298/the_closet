import { Clothing, ClothingImage, ClothingMaterial } from "@/custom_types";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getClothings } from "@/composables/GetCalls";
import { useUserStore } from "./user";
import { postImage } from "@/composables/PostCalls";
import { base64ToBlob } from "@/helpers/blobFunctions";


export const useClothingListStore = defineStore("clothingList", () => {
  const clothings = ref<Clothing[]>([]);

  const isEmpty = computed(() => {
    return clothings.value.length === 0;
  });

  function fetch() {
    getClothings().then((result) => {
      clothings.value = result;

      for (const clothing of clothings.value) {
        clothing.image.blob = base64ToBlob(clothing.image.largeBinaryData, clothing.image.contentType);
        console.log(clothing.image.blob)
        clothing.image.url = URL.createObjectURL(clothing.image.blob)
        console.log(clothing.image)
      }

      console.log(clothings.value)
    });
  }

  return {
    clothings,
    isEmpty,
    fetch
  };
});

const emptyClothingObject: Omit<Clothing, "user"> = {
  id: -1,
  name: "",
  size: "",
  price: 0,
  notes: "",
  color: {
    id: -1
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
   
  image: {
    id: -1
  },
  clothingMaterials: [
    {
      material: {
        "id": 19,
        "material": "Cotton"
      }
    }
  ]
};

export const useClothingStore = defineStore("clothingItem", () => {

  const clothingItem = ref<Clothing>({
    ...emptyClothingObject,
    user: {
      "id": useUserStore().id,
      "username": useUserStore().name
    }
  });

  // getters

  const categoryTreeValue = computed({
    get() {
      return {
        [clothingItem.value.category.id]: true
      };
    },
    
    set(newValue) {
      const id = Object.keys(newValue)[0];
      clothingItem.value.category.id = Number(id);
    }
  });

  const materialSelectValue = computed({
    get() {
      const materialList: ClothingMaterial[] = [];

      for (const material of clothingItem.value.clothingMaterials) {
        materialList.push(material.material);
      }

      return materialList;
    },

    set(newValue) {
      const materialList: ClothingMaterial[] = [];

      for (const material of newValue) {
        materialList.push({
          material: material
        });
      }

      clothingItem.value.clothingMaterials = materialList;
    }

  });

  // actions

  function updateClothingItem(newItem: Clothing) {
    clothingItem.value = newItem;
  }

  function updateImage(newImage: ClothingImage) {
    clothingItem.value.image = newImage;
  }

  function clear() {
    clothingItem.value = {
      ...emptyClothingObject,
      user: {
        "id": useUserStore().id,
        "username": useUserStore().name
      }
    };
  }

  return {
    clothingItem,
    updateClothingItem,
    updateImage,
    clear,
    categoryTreeValue,
    materialSelectValue
  };

});

export const useImageStore = defineStore("image", () => {
  const image = ref<Blob>();

  const id = ref<number>(-1);

  const postSuccess = ref(true);

  const url = computed(() => {
    return image.value === undefined ? "" : URL.createObjectURL(image.value);
  });

  function setImage(newImage: File | Blob) {
    image.value = newImage;
  }

  async function post() {

    return postImage(image.value).then((response) => {
      postSuccess.value = response.ok;
      console.log(response)

      return response.json();
    });

  }
 
  return {
    image,
    setImage,
    id,
    post,
    postSuccess,
    url
  };
});