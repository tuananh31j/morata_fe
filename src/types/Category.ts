export interface ICategoryPopular {
    totalProducts?: number;
    categoryId: string;
    categoryName: string;
    image: string;
}
export type ICategory = {
    _id: string;
    name: string;
    attributeIds: string[];
};

export type ICategoryFormData = Omit<ICategory, '_id'>;
