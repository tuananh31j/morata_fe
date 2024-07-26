export type IRankValue = {
    min: number | string;
    max: string | number;
};
export type IParams = Partial<{
    search?: string;
    page: string;
    limit: string | number;
    sort: string;
    price: string;
    brandId: string;
    categoryId: string;
    rating: string;
    orderStatus: string;
    paymentMethod: string;
    isAvailable: boolean;
}>;

export type Params = {
    [key: string]: any;
    page?: string;
    sort?: string;
    limit?: string;
    fields?: string;
};

export type IPagination = { page: number; limit: number };
