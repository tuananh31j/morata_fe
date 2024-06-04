export interface ICartItem {
    _id: string;
    name: string;
    thumbnail: string;
    discountPercentage: number;
    price: number;
}

export type ICartItemsResponse = {
    productId: ICartItem;
    quantity: number;
};

export type ICartDataResponse = {
    items: ICartItemsResponse[];
    userId: string;
    _id: string;
};
