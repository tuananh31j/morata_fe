import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useFilterOrderNew = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        let params = {};
        searchParams?.forEach((value, key) => {
            params = { ...params, [key]: value };
        });
    }, []);
};

export default useFilterOrderNew;
