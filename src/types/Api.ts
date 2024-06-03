export type IParams = Partial<{
    page: number;
    limit: number;
    sort: Record<string, number>;
    price: { min: number; max: number };
    brandId: string;
    categoryId: string;
    rating: { min: number; max: number };
}>;
