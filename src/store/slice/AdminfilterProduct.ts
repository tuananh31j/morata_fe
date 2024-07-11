import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IParams } from '~/types/Api';

export const MIN_PRICE = 0;
export const MAX_PRICE = 10000;
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const DEFAULT_VALUE = {
    categoryId: '',
    brandId: '',
    page: 1,
    search: '',
    sort: -1,
    rating: { min: MIN_RATING, max: MAX_RATING },
    price: { min: MIN_PRICE, max: MAX_PRICE },
    isAvailable: true,
};

export type ILimitValue = {
    min: number;
    max: number;
};
export type ISort = {
    key: number;
};

export type IOptions = {
    value: string | string[] | number | boolean | ILimitValue | ISort;
    checked?: boolean;
    limit?: ILimitValue;
};
export type IFilterOptions = {
    [key in keyof Omit<IParams, 'paymentMethod' | 'orderStatus' | 'limit'>]: IOptions;
};

export type IFilterPayload = {
    key: keyof Omit<IParams, 'paymentMethod' | 'orderStatus' | 'limit'>;
    value: IOptions;
};
export type IStorageValue = {
    key: string;
    value: IOptions;
};
export type IFilterStorage = {
    filters: {
        categoryId: IStorageValue;
        brandId: IStorageValue;
        page: IStorageValue;
        search: IStorageValue;
        price: IStorageValue;
        sort: IStorageValue;
        rating: IStorageValue;
        isAvailable: IStorageValue;
    };
};
export type IInitialFilterState = {
    filters: {
        categoryId: IOptions;
        brandId: IOptions;
        page: IOptions;
        search: IOptions;
        price: IOptions;
        sort: IOptions;
        rating: IOptions;
        isAvailable: IOptions;
    };
};

const initialState: IInitialFilterState = {
    filters: {
        categoryId: {
            value: DEFAULT_VALUE.categoryId,
            checked: false,
        },
        brandId: {
            value: DEFAULT_VALUE.brandId,
            checked: false,
        },
        page: {
            value: DEFAULT_VALUE.page,
        },
        search: {
            value: DEFAULT_VALUE.search,
        },
        isAvailable: {
            value: DEFAULT_VALUE.isAvailable,
            checked: false,
        },
        sort: {
            value: {
                key: DEFAULT_VALUE.sort,
            },
        },
        price: {
            value: DEFAULT_VALUE.price,
        },
        rating: {
            value: DEFAULT_VALUE.rating,
        },
    },
};

const AdminTableFilterProduct = createSlice({
    name: 'AdminfilterProduct',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<IFilterPayload>) => {
            const { key, value } = action.payload;
            const filters = JSON.parse(localStorage.getItem('filters') || '{}');

            if (!filters?.filters) {
                filters.filters = {};
            }
            // set page to 1 when filter change is not page
            if (key !== 'page') {
                state.filters.page.value = 1;
                filters.filters.page = { key: 'page', value: { value: 1 } };
            }
            // set filter to local storage
            filters.filters[key] = { key, value };
            localStorage.setItem('filters', JSON.stringify(filters));

            // set filter to state
            state.filters[key] = value;
        },
        resetAllFilters: (state) => {
            console.log('OK');

            const filters = JSON.parse(localStorage.getItem('filters') || '{}');
            if (filters?.filters) {
                filters.filters = initialState.filters;
            } else {
                filters.filters = {};
            }

            // reset all filters storage to default
            localStorage.setItem('filters', JSON.stringify(filters));

            // reset all redux filters to default
            state.filters = initialState.filters;
        },
    },
});

export const { setFilter, resetAllFilters } = AdminTableFilterProduct.actions;
export default AdminTableFilterProduct.reducer;
