export interface Category {
    id: number,
    type: string,
    parentCategory: ParentCategory,
}

export type Material = {
    material: string;
    id: number; 
}

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
}

export type User = {
    id: number,
    username: string
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
}

export class Status {
    id: number;
    status: string;

    constructor(id: number, status: string) {
        this.id = id;   
        this.status = status;
    }
}