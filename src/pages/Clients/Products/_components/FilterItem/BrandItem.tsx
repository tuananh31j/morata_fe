import FilterItem from './FilterItem';
import { FC } from 'react';
import { IBrand } from '~/types/Brand';

type IBrandFilterProps = {
    handleFilterBrand: (id: string) => void;
    brands: IBrand[];
};

const BrandFilterItem: FC<IBrandFilterProps> = ({ handleFilterBrand, brands }) => {
    return <FilterItem handleFilter={handleFilterBrand} data={brands} filterName='Brand' boxType />;
};

export default BrandFilterItem;
