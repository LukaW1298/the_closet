export type Category = {
    name: string,
    id: number,
    child_categories?: Array<Category>
}

export type Material = {
    name: string,
    id: number
}