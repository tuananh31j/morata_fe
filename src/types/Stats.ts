export type IOrderStatsResponse = {
    data: [
        {
            date: string;
            totalOrders: number;
            totalRevenue: number;
        },
    ];
};

export type IProductStatsResponse = {
    data: {
        topSellingProducts: {
            _id: string;
            name: string;
            image: string;
            price: number;
            totalQuantity: number;
            totalRevenue: number;
            percentageOfTotal: string;
        }[];
        leastSellingProducts: {
            _id: string;
            name: string;
            image: string;
            price: number;
            totalQuantity: number;
            totalRevenue: number;
            percentageOfTotal: string;
        }[];
        dateRange: {
            start: string;
            end: string;
        };
    };
};
