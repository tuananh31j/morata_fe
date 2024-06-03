import useResponsive from '~/hooks/_common/useResponsive';
import { FC } from 'react';
import FilterDrawer from '~/pages/Clients/Products/_components/FilterDrawer';
import { ICategory } from '~/types/category';
import { IBrand } from '~/types/Brand';
import CateFilterItem from '../_components/FilterItem/CateItem';
import BrandFilterItem from '../_components/FilterItem/BrandItem';
import RateFilter from '../_components/FilterItem/RatingItem';
import PriceFilterItem from '../_components/FilterItem/PriceItem';

type IFilterProps = {
    handleFilterCate: (id: string) => void;
    handleFilterBrand: (id: string) => void;
    handleFilterRating: (ratingFilter: { min: number; max: number }) => void;
    handleFilterPrice: (priceFilter: { min: number; max: number }) => void;
    categories: ICategory[];
    brands: IBrand[];
};

const FilterSidebar: FC<IFilterProps> = ({
    categories,
    brands,
    handleFilterCate,
    handleFilterBrand,
    handleFilterRating,
    handleFilterPrice,
}) => {
    const { isMobile, isTablet } = useResponsive();

    return (
        <div className='rounded-md border border-transparent bg-white p-4'>
            {isMobile && <FilterDrawer />}
            {isTablet && (
                <div className='relative hidden h-full md:block'>
                    <CateFilterItem handleFilterCate={handleFilterCate} categories={categories} />
                    <BrandFilterItem handleFilterBrand={handleFilterBrand} brands={brands} />
                    <RateFilter handleFilterRating={handleFilterRating} />
                    <PriceFilterItem handleFilterPrice={handleFilterPrice} />
                    <button className='my-4 w-full rounded-md border border-[#1e3a8a] bg-[#1e3a8a] p-3 hover:text-white'>
                        Reset All
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterSidebar;
