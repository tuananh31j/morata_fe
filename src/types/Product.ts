export interface IProduct {
    _id: string;
    name: string;
    price: number;
    discountPercentage: number;
    rating: number;
    thumbnail: string;
    stock: number;
    key: string;
    images: string[];
    categoryId: string;
    brandId: string;
    reviewIds: string[];
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    description: string;
    sku: string;
}

export type IProductItem = {
    _id: string;
    name: string;
    price: number;
    discountPercentage: number;
    rating: number;
    categoryId: string;
    brandId: string;
    stock: number;
    images: string[];
    thumbnail: string;
    reviewIds: string[];
};

export type IAllProductsResponse = {
    products: IProductItem[];
    page: number;
    totalDocs: number;
    totalPages: number;
};
export interface IThumbnailAntd extends File {
    uid: string;
    originFileObj: File;
}

export type IProductFiles = {
    file: IThumbnailAntd;
    fileList: FileList;
};
export type ITagsType = {
    label: string;
    value: string;
};
export type IAttribute = {
    _id: string;
    type: string;
    name: string;
    attributeKey: string;
    isRequired: boolean;
    values?: string[];
};
export type IProductVariation = {
    thumbnail?: {
        file: File;
        fileList: IThumbnailAntd[];
    };
    color: string;
    price: number;
    stock: number;
};
export type IProductForm = {
    name: string;
    thumbnail: IProductFiles | null;
    images: IProductFiles | null;
    categoryId: string;
    brandId: string;
    discountPercentage: number;
    description: string;
    attributes: IAttribute[];
    variations: IProductVariation[];
};

export type IProductParams = {
    search: string | null;
    categoryId: string | string[] | null;
};
export type PropTypeProduct = { product: IProduct };
