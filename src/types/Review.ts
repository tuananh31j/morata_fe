export interface IReviewProductResponse {
    rating: number;
    content: string;
    userId: {
        name: string;
        avatar: string;
        _id: string;
    };
    productId: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}
export interface IReviewResponse {
    reviewList: IReviewProductResponse[];
    totalDocs: number;
    limit: number;
}

export interface IAdminReviewResponse {
    reviewList: IReviewProductResponse[];
    page: number;
    totalDocs: number;
    totalPages: number;
}
export interface IStarsReviewResponse {
    countReview: number;
    starsReview: { count: number; star: number }[];
}
export interface IAdminReportResponse {
    reportList: IReportReviewResponse[];
    page: number;
    totalDocs: number;
    totalPages: number;
}

export type ReportData = {
    reason: string;
    content?: string;
    reporterId?: string;
    userId: string;
    reviewId: string;
};
export interface IReportReviewResponse {
    reason: string;
    content: string;
    reporterId: string;
    userId: {
        name: string;
        _id: string;
    };
    reviewId: string;
    _id: string;
    createdAt: string;
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
