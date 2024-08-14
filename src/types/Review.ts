export interface IReviewProductResponse {
    rating: number;
    content: string;
    userId: {
        username: string;
        _id: string;
    };
    productId: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

export interface IReviewResponse {
    rating: number;
    content: string;
    userId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
    orderId?: string;
}
export type ReviewData = {
    userId?: string;
    productId?: string;
    rating: number;
    content: string;
    orderId?: string;
    _id?: string;
};
export interface ICountReview {
    count: number;
}
