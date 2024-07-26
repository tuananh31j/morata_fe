export interface IReviewProductResponse {
    rating: number;
    content: string;
    userId: {
        username: string;
    };
    productId: string;
    createdAt: string;
    updatedAt: string;
}
