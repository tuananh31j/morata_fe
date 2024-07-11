export type IRankValue = {
    min: number | string;
    max: string | number;
};
export type IMix = number | string | IRankValue | null;
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
