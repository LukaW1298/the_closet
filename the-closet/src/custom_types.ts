export interface Category {
    id: number,
    type: string,
    parentCategory: ParentCategory,
}

export type Material = {
    material: string;
    id: number;
};

export type MaterialSelected = {
    [key: number]: boolean
};

export type CategorySelected = {
    [key: number]: boolean
};

export type ChildCategory = {
    "id": number,
    "type": string,
    "parentCategory": {
        "id": number,
        "type": string
    }
};

export type ParentCategory = {
    id?: number,
    type: string,
    label: string,
    key: string | number,
    name?: string,
    selectable: boolean,
    children?: {
        id?: number,
        type?: string,
        key: string | number,
        label: string
    }[]
};


export type User = {
    id: number,
    username?: string,
    password?: string,
    email?: string
};

export type ClothingItem = {
    id: number,
    name: string,
    brand: Brand,
    size: string,
    status: Status,
    category: ChildCategory,
    price: number,
    notes: string,
    user: User,
    washingMode: WashingMode,
    image: Image,
    material: Material[],
    color: Color
};

export type ClothingCategory = {
    id: number,
    type?: string,
    parentCategory?: {
        id: number,
        type?: string
    }
};

export type ClothingStatus = {
    id: number,
    status?: string
};

export type ClothingWashingMode = {
    id: number,
    washingMode?: string
};

export type ClothingBrand = {
    id: number,
    name?: string
};

export type ClothingImage = {
    id: number,
    blob?: Blob,
    url: string
};

export type ClothingMaterial = {
    material: {
        id: number,
        material?: string
    }
};

export type ClothingColor = {
    id: number,
    name?: string,
    hexCode?: string
};

export type Clothing = {
    id: number,
    name: string,
    price: number,
    notes: string,
    size: string,
    category: ClothingCategory,
    status: ClothingStatus,
    washingMode: ClothingWashingMode,
    user: User,
    brand: ClothingBrand,
    image: ClothingImage,
    color: ClothingColor,
    clothingMaterials: ClothingMaterial[],
    checkedForOutfit?: boolean

};

export type Image = {
    id: number,
    blob?: Blob
};

export type WashingMode = {
    id: number,
    washingMode: string
};

export type Brand = {
    id: number,
    name: string
};


export type Color = {
    id: number,
    name: string,
    hexCode: string
};

export class Status {
    id: number;
    status: string;

    constructor(id: number, status: string) {
        this.id = id;
        this.status = status;
    }
}

export type Occasion = {
    id: number,
    occasion?: string
};

export type Weather = {
    id: number,
    weather?: string
};

<<<<<<< Updated upstream
export type OutftitType = {
  id: number,
  outfitType?: string
};

export type Outfit = {
  date: string | number,
  user: User,
  weather: Weather,
  outfitType: OutftitType,
  outfitOccasions: {
    occasion: Occasion
  }[],
  clothingOutfits: {
    clothing: {
      id: number
    }
  }[]
=======
export type OutfitType = {
    id: number,
    outfitType?: string
};

export type Outfit = {
    date: string | number,
    user: User,
    weather: Weather,
    outfitType: OutfitType,
    outfitOccasions: {
        occasion: Occasion
    }[],
    clothingOutfits: {
        clothing: {
            id: number
        }
    }[]
>>>>>>> Stashed changes
}