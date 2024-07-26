export interface ICartItem {
    _id: string;
    color: string;
    image: string;
    price: number;
    productId: {
        _id: string;
        name: string;
    };
    stock: number;
}

export type ICartItemsResponse = {
    productVariation: ICartItem;
    quantity: number;
};

export type ICartDataResponse = {
    items: ICartItemsResponse[];
    userId: string;
    _id: string;
};
