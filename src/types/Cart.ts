export type AddCartBody = {
    userId: string;
    productId: string;
    quantity: number;
};
export type CartItem = {
    _id: string;
    name: string;
    thumbnail: string;
    discountPercentage: number;
    price: number;
};

export interface CartItemsResponse {
    productId: CartItem;
    quantity: number;
}

export interface CartData {
    items: CartItemsResponse[];
    userId: string;
    _id: string;
    // Other fields as per your application's requirements
}
export interface HandleCart {
    userId: string;
    productId: string;
}
