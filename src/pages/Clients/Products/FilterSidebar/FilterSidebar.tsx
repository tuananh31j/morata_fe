import useResponsive from '~/hooks/_common/useResponsive';
import { FC } from 'react';
import FilterDrawer from '~/pages/Clients/Products/_components/FilterDrawer';
import { ICategory } from '~/types/Category';
import { IBrand } from '~/types/Brand';
import RatingFilter from '../_components/FilterItem/RatingItem';
import PriceFilterItem from '../_components/FilterItem/PriceItem';
import FilterString from '../_components/FilterItem/FillterString';
import FilterBox from '../_components/FilterItem/FilterBox';
import { useFilters } from '~/hooks/_common/useFilters';

type IFilterProps = {
    categories: ICategory[];
    brands: IBrand[];
};

const FilterSidebar: FC<IFilterProps> = ({ categories, brands }) => {
    const { isMobile, isTablet } = useResponsive();
    const { resetQueryParams } = useFilters();

    return (
        <div className='rounded-md border border-transparent bg-white p-4'>
            {isMobile && <FilterDrawer />}
            {isTablet && (
                <div className='relative hidden h-full md:block'>
                    <FilterString data={categories} filterName='Category' filterParams='categoryId' />
                    <FilterBox data={brands} filterName='Brand' filterParams='brandId' />
                    <RatingFilter filterName='Rating' />
                    <PriceFilterItem />
                    <button
                        onClick={resetQueryParams}
                        className='my-4 w-full rounded-md border border-[#1e3a8a] bg-white p-3 text-black hover:bg-[#1e3a8a] hover:text-white'
                    >
                        Reset All
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterSidebar;
