import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { initFilter, KEY_STATE_FILTER_PARAMS, updateFilterParams } from '~/store/slice/filterProductSlice';
import { useTypedSelector } from '~/store/store';
import { IProductParams } from '~/types/Product';

const useFilterProduct = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const { queryParams, pagination } = useTypedSelector((state) => state.filterProduct);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    useEffect(() => {
        const filter = { value: '' };
        const page = { value: 1 };
        searchParams?.forEach((value, key) => {
            if (key === KEY_STATE_FILTER_PARAMS) {
                filter.value = value;
            }
            if (key === 'page') {
                page.value = Number(value);
            }
        });
        // @dispatch
        if (filter.value !== '') {
            dispatch(updateFilterParams({ filter: JSON.parse(filter.value), page: page.value }));
        } else {
            dispatch(
                updateFilterParams({
                    filter: initFilter,
                    page: page.value,
                })
            );
        }
        /* eslint-disable */
    }, []);
    /* eslint-enable */

    const updateQueryParam = (value: IProductParams, page: number) => {
        const newParams = new URLSearchParams(searchParams?.toString());

        if (value) newParams.set(KEY_STATE_FILTER_PARAMS, JSON.stringify(value));
        if (page) newParams.set('page', String(page));
        else newParams.delete('page');

        navigator(`${pathname}?${newParams.toString()}`);

        dispatch(updateFilterParams({ filter: value, page }));
    };

    return { queryParams, pagination, updateQueryParam };
};

export default useFilterProduct;
