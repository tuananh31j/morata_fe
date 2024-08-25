import { FC } from 'react';
import { IMenu } from '~/types/Category';
import { IBrand } from '~/types/Brand';
import RatingFilter from '../_components/FilterItem/RatingItem';
import PriceFilterItem from '../_components/FilterItem/PriceItem';
import FilterRadio from '../_components/FilterItem/FilterRadio';
import FilterBox from '../_components/FilterItem/FilterBox';
import useFilter from '~/hooks/_common/useFilter';
import useGetFilterByCategory from '~/hooks/products/Queries/useGetFilterByCategory';
import FilterBoxForVariant from '../_components/FilterItem/FilterBoxForVariant';

type IFilterProps = {
    categories: IMenu[];
    brands: IBrand[];
};

const FilterSidebar: FC<IFilterProps> = ({ categories, brands }) => {
    const { reset, query } = useFilter();
    const { data: filterByCate } = useGetFilterByCategory(query.categoryId);

    return (
        <div className='rounded-md border border-transparent bg-white p-3 py-0'>
            <div className='relative hidden h-full md:block'>
                <div className='filter__scollbar h-[100vh] w-full overflow-x-hidden overflow-y-scroll'>
                    <FilterRadio data={categories} filterName='Danh Mục' filterParams='categoryId' />
                    <FilterBox data={brands} filterName='Hãng' filterParams='brandId' />
                    {filterByCate &&
                        Array.isArray(filterByCate.data) &&
                        filterByCate.data.map((item) => (
                            <FilterBoxForVariant
                                prevKey='raw'
                                suffixKey={item.isVariant ? 'variant' : undefined}
                                key={item._id}
                                data={item.values}
                                filterName={item.name}
                                filterParams={item.attributeKey}
                            />
                        ))}
                    <RatingFilter filterName='Đánh Giá' />
                    <PriceFilterItem />
                </div>

                <button
                    onClick={reset}
                    className='sticky my-4 w-full rounded-md border border-[#1e3a8a] bg-white p-3 text-black hover:bg-[#1e3a8a] hover:text-white'
                >
                    Xóa bộ lọc
                </button>
            </div>
        </div>
    );
};

export default FilterSidebar;
