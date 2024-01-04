

export interface Category {
    name: string,
    id: number,
    parentCategoryID?: number,
}

export class Material {
    material: string;
    id: number; 

    constructor(material: string, id: number) {
        this.material = material;
        this.id = id;
    }
}

export type ClothingItem = {
    id: number,
    userID: number,
    name: string,
    brand: string,
    size: string,
    colorID: number,
    materialIdList: number[]
    materialList: string[],
    status: string,
    categoryID: number,
    category: string,
    subCategoryID: number,
    subCategory: string,
    price: number,
    imageURL: string,
    washingModeID: number
}

export type WashingMode = {
    id: number,
    washingMode: string
}

export type Brand = {
    id: number,
    name: string
}

export class Color {
    id: number;
    name: string;
    hex_code: string;

    constructor(id: number, name: string, hex_code: string) {
        this.id = id;
        this.name = name;
        this.hex_code = hex_code;
    }

}

export class Status {
    id: number;
    status: string;

    constructor(id: number, status: string) {
        this.id = id;   
        this.status = status;
    }
}