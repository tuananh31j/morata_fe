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
    isHide: boolean;
    reviewCount: number;
    _id: string;
    name: string;
    discount: number;
    images: string[];
    imageUrlRefs: string[];
    thumbnail: string[];
    thumbnailUrlRef: string[];
    status: string;
    isAvailable: boolean;
    isDeleted: boolean;
    attributes: {
        key: string;
        value: string;
        _id?: string;
    }[];
    rating: number;
    reviewIds: string[];
    variationIds: {
        _id: string;
        price: number;
        image: string;
        stock: number;
        sku: string;
        color: string;
        productId: string;
    }[];
    brandId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
};

export type IProductItemNew = {
    _id: string;
    name: string;
    thumbnail: string;
    images: string[];
    rating: number;
    reviewCount: number;
    categoryId: string;
    brandId: string;
    variationIds: {
        _id: string;
        price: number;
        discountPercentage?: number;
        stock: number;
        sku: string;
        color: string;
        image?: string;
        productId: string;
    }[];
};

export type IAllProductResponseNew = {
    products: IProductItemNew[];
    page: number;
    totalDocs: number;
    totalPages: number;
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
