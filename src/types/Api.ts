export type IRankValue = {
    min: number | string;
    max: string | number;
};
export type IMix = number | string | IRankValue | null;
export type IParams = Partial<{
    page: string;
    limit: string;
    sort: string;
    price: string;
    brandId: string;
    categoryId: string;
    rating: string;
}>;
