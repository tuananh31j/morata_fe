import { ICategory } from '~/types/category';
import FilterItem from './FilterItem';
import { FC } from 'react';

type ICateFilterProps = {
    handleFilterCate: (id: string) => void;
    categories: ICategory[];
};

const CateFilterItem: FC<ICateFilterProps> = ({ handleFilterCate, categories }) => {
    return <FilterItem handleFilter={handleFilterCate} data={categories} filterName='Category' boxType />;
};

export default CateFilterItem;
