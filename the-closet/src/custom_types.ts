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
  id: number,
  type: string,
  name?: string,
  children?: {
    id: number,
    type: string
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
  url?: string
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
  clothingMaterials: ClothingMaterial[]

};

export type Image = {
  id: number, 
  url: string
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