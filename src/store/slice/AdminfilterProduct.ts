import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IParams } from '~/types/Api';

export const MIN_PRICE = 0;
export const MAX_PRICE = 20000;
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
    limit: 10,
};
const DEFAULT_STORAGE_VALUE = {
    filters: {
        categoryId: {
            key: 'categoryId',
            value: { value: '', checked: false },
        },
        brandId: {
            key: 'brandId',
            value: { value: '', checked: false },
        },
        page: {
            key: 'page',
            value: { value: 1 },
        },
        search: {
            key: 'search',
            value: { value: '' },
        },
        sort: {
            key: 'sort',
            value: {
                value: {
                    key: -1,
                },
            },
        },
        rating: {
            key: 'rating',
            value: { value: { min: MIN_RATING, max: MAX_RATING } },
        },
        price: {
            key: 'price',
            value: { value: { min: MIN_PRICE, max: MAX_PRICE } },
        },
        isAvailable: {
            key: 'isAvailable',
            value: { value: true, checked: true },
        },
        limit: {
            key: 'limit',
            value: { value: 10 },
        },
    },
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
    [key in keyof Omit<IParams, 'paymentMethod' | 'orderStatus'>]: IOptions;
};

export type IFilterPayload = {
    key: keyof Omit<IParams, 'paymentMethod' | 'orderStatus'>;
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
        limit: IStorageValue;
    };
};
export type IFilterParams = {
    key: keyof Omit<IParams, 'paymentMethod' | 'orderStatus'>;
    value: IOptions['value'];
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
        limit: IOptions;
    };
    params: IParams;
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
            checked: true,
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
        limit: {
            value: DEFAULT_VALUE.limit,
        },
    },
    params: {
        categoryId: DEFAULT_VALUE.categoryId,
        brandId: DEFAULT_VALUE.brandId,
        page: DEFAULT_VALUE.page.toString(),
        search: DEFAULT_VALUE.search,
        limit: DEFAULT_VALUE.limit,
        sort: JSON.stringify({ key: DEFAULT_VALUE.sort }),
        rating: JSON.stringify({ min: MIN_RATING, max: MAX_RATING }),
        price: JSON.stringify({ min: MIN_PRICE, max: MAX_PRICE }),
        isAvailable: DEFAULT_VALUE.isAvailable,
    },
};

const getFilters = () => {
    return JSON.parse(localStorage.getItem('filters') || '{}') as IFilterStorage;
};

const setFilters = (filters: IFilterStorage) => {
    localStorage.setItem('filters', JSON.stringify(filters));
};

const AdminTableFilterProduct = createSlice({
    name: 'AdminfilterProduct',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<IFilterPayload>) => {
            const { key, value } = action.payload;
            const filters = getFilters();
            if (!filters?.filters) {
                filters.filters = DEFAULT_STORAGE_VALUE.filters;
            }
            // set page to 1 when filter change is not page
            if (key !== 'page') {
                state.filters.page.value = 1;
                filters.filters.page = { key: 'page', value: { value: 1 } };
            }
            // set filter to local storage
            filters.filters[key] = { key, value };
            setFilters(filters);

            // set filter to state
            if (typeof value.value === 'object') {
                const valueTransferToString = JSON.stringify(value.value);

                value.value = valueTransferToString;
                state.filters[key] = value;
            } else {
                state.filters[key] = value;
            }
            (state.params[key] as IOptions['value']) = value.value;
        },
        resetAllFilters: (state) => {
            const filters = getFilters();

            if (filters?.filters) {
                const filtersKeys = Object.keys(filters.filters);
                filtersKeys.forEach((key) => {
                    // if (key !== 'search') {
                    filters.filters[key as keyof IFilterStorage['filters']].value.value =
                        DEFAULT_STORAGE_VALUE.filters[key as keyof IFilterStorage['filters']].value.value;
                    // }
                });
            } else {
                filters.filters = DEFAULT_STORAGE_VALUE.filters;
            }

            // reset all filters storage to default
            setFilters(filters);
            // reset all redux filters to default
            state.filters = initialState.filters;
        },
        setFilterParams(state, action: PayloadAction<IFilterParams>) {
            const { key, value } = action.payload;

            (state.params[key] as IOptions['value']) = typeof value === 'object' ? JSON.stringify(value) : value;
        },
    },
});

export const { setFilter, resetAllFilters, setFilterParams } = AdminTableFilterProduct.actions;
export default AdminTableFilterProduct.reducer;
