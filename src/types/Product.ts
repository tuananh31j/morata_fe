import { variationAttribute } from './cart/CartResponse';

export interface IProduct {
    _id: string;
    name: string;
    price: number;
    discountPercentage: number;
    rating: number;
    reviewCount: number;
    thumbnail: string;
    stock: number;
    key: string;
    images: string[];
    categoryId: string;
    brandId: string;
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
export type IAttributesProduct = Array<{
    key: string;
    value: string;
    _id: string;
    id: string;
}>;
export type IProductItemNew = {
    _id: string;
    name: string;
    thumbnail: string;
    discount: number;
    images: string[];
    isAvailable: boolean;
    rating: number;
    reviewCount: number;
    description: string;
    categoryId: {
        name: string;
        _id: string;
    };
    brandId: {
        name: string;
        _id: string;
    };
    variationIds: {
        _id: string;
        price: number;
        discountPercentage?: number;
        stock: number;
        sku: string;
        color: string;
        storage?: string;
        image?: string;
        productId: string;
        variantAttributes: variationAttribute[];
    }[];
    attributes: IAttributesProduct;
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
export type IVariationDetailResponse = {
    color: string;
    image: string;
    price: string;
    productId: string;
    _id: string;
};
export type IProductForm = {
    name: string;
    thumbnail: IProductFiles | null;
    images: IProductFiles | null;
    categoryId: string;
    brandId: string;
    description: string;
    attributes: IAttribute[];
    variations: IProductVariation[];
};

export type IProductParams = {
    search: string | null;
    categoryId: string | string[] | null;
};
export type PropTypeProduct = { product: IProduct };
