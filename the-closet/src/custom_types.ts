export type Category = {
    name: string,
    id: number,
    child_categories?: Array<Category>
}

export type Material = {
    name: string,
    id: number
}

export type ClothingItem = {
    id: number,
    userID: number,
    name: string,
    brand: string,
    size: string,
    colorID: number,
    color: string,
    materialIdList: number[]
    materialList: string[],
    status: string,
    categoryID: number,
    category: string,
    subCategoryID: number,
    subCategory: string,
    price: number,
    imageURL: string
}