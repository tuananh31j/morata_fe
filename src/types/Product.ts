export interface IProduct {
    _id: string;
    name: string;
    price: number;
    discountPercentage: number;
    rating: number;
    thumbnail: string;
    stock: number;
    images: string[];
    categoryId: string;
    brandId: string;
    reviewIds: string[];
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    sku: string;
}

export type IAllProductsResponse = {
    docs: IProduct[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
};
export type PropTypeProduct = {
    product: IProduct;
};

export interface BrandId {
    _id: string;
    name: string;
    description: string;
}
export interface CategoryId {
    _id: string;
    name: string;
    description: string;
}
