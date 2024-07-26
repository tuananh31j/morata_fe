import _ from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { setQuery } from '~/store/slice/filterSlice';
import { useTypedSelector } from '~/store/store';
import { IParams } from '~/types/Api';

const useFilter = () => {
    const dispatch = useDispatch();
    const query = useTypedSelector((state) => state.filter.query);
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigator = useNavigate();
    useEffect(() => {
        const params: any = {};
        searchParams?.forEach((value, key) => {
            params[key] = value;
        });
        // @dispatch
        dispatch(setQuery(params));
    }, []);

    const reset = () => {
        dispatch(setQuery({}));
    };

    const updateQueryParam = (params: IParams) => {
        const newParams = new URLSearchParams(searchParams?.toString());
        const checkedParams = _.omitBy(params, _.isUndefined);

        Object.entries(params).forEach(([key, value]) => {
            if (value) newParams.set(key, String(value));
            else {
                newParams.delete(key);
            }
        });
        dispatch(setQuery(checkedParams));
        navigator(`${pathname}?${newParams.toString()}`);
    };

    return { query, updateQueryParam, reset };
};

export default useFilter;
