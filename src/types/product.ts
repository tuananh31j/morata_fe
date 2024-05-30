export interface IProduct {
    _id: string;
    name: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    images: string[];
    categoryId: string;
    brandId: string;
    reviewIds: string[];
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
}

export type PropTypeProduct = {
    product: IProduct;
};
