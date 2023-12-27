export type Category = {
    name: string,
    id: number,
    child_categories?: Array<Category>
}

export type Material = {
    material: string,
    id: number
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