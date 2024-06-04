import { useState } from 'react';
import FilterProducts from './FilterSidebar';
import SmallCard from '~/components/ProductCard/SmallCard';
import clsx from 'clsx';
import { Pagination } from 'antd';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import SortAndViewOptions from '~/pages/Clients/Products/_components/SortAndViewOptions';
import useGetCategoriesAndBrands from '~/hooks/Queries/useGetCategoriesAndBrands';
import useGetProducts from '~/hooks/Queries/Products/useGetProducts';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import { IParams } from '~/types/Api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';

const Products = () => {
    useDocumentTitle('Products');
    const [searchParams] = useSearchParams();
    const cate = searchParams.get('cate');
    const navigator = useNavigate();
    const LIMIT = 8;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState<number>(1);
    const [brandId, setBrandId] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>('');
    const [price, setPrice] = useState<{ min: number; max: number }>();
    const [rating, setRating] = useState<{ min: number; max: number }>();
    const query: { params: IParams } = { params: { limit: LIMIT, sort: { name: sort } } };

    if (brandId) {
        query.params = { ...query.params, brandId };
    }
    if (cate) {
        query.params = { ...query.params, categoryId: cate };
    }
    if (categoryId) {
        if (cate) {
            navigator('/products');
        }
        query.params = { ...query.params, categoryId };
    }
    if (price) {
        query.params = { ...query.params, price };
    }
    if (rating) {
        query.params = { ...query.params, rating };
    }
    if (currentPage) {
        query.params = { ...query.params, page: currentPage };
    }

    // @Query
    const [{ data: brands }, { data: categoies }] = useGetCategoriesAndBrands();
    const { data: products, isLoading: isProductsLoading } = useGetProducts(query.params);

    const handleFilterCate = (id: string) => {
        setCurrentPage(1);
        setCategoryId(id);
    };
    const handleFilterBrand = (id: string) => {
        setCurrentPage(1);
        setBrandId(id);
    };
    const handleFilterRating = (ratingFilter: { min: number; max: number }) => {
        setCurrentPage(1);
        setRating(ratingFilter);
    };
    const handleFilterPrice = debounce((priceFilter: { min: number; max: number }) => {
        setCurrentPage(1);
        setPrice(priceFilter);
    }, 300);

    const handleSortByName = (sortValue: 1 | -1) => {
        setCurrentPage(1);
        setSort(sortValue);
    };

    const [gridCol, setGridCol] = useState<string>('');
    const handleClickGrid1 = () => {
        setGridCol('grid-cols-1');
    };
    const handleClickGrid2 = () => {
        setGridCol('grid-cols-2');
    };
    const handleClickGrid3 = () => {
        setGridCol('grid-cols-3');
    };
    const handleClickGrid4 = () => {
        setGridCol('grid-cols-4');
    };
    const handleClickGrid5 = () => {
        setGridCol('grid-cols-5');
    };

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <>
            {/* <WrapperList border title='Popular Categories'>
                <CarouselDisplay>
                    {data.map((item, i) => (
                        <CarouselItem key={i}>
                            <CategoryCard />
                        </CarouselItem>
                    ))}
                </CarouselDisplay>
            </WrapperList> */}

            <div className='block transition-all duration-300 ease-in-out md:flex md:gap-5'>
                <div className='md:w-[30%]'>
                    {categoies && brands && (
                        <FilterProducts
                            handleFilterCate={handleFilterCate}
                            handleFilterBrand={handleFilterBrand}
                            handleFilterRating={handleFilterRating}
                            handleFilterPrice={handleFilterPrice}
                            categories={categoies.data}
                            brands={brands.data}
                        />
                    )}
                </div>
                <div className='w-full'>
                    <SortAndViewOptions
                        handleSortByName={handleSortByName}
                        handleClickGrid1={handleClickGrid1}
                        handleClickGrid2={handleClickGrid2}
                        handleClickGrid3={handleClickGrid3}
                        handleClickGrid4={handleClickGrid4}
                        handleClickGrid5={handleClickGrid5}
                    />
                    <div
                        className={clsx(
                            { [gridCol]: !!gridCol, ['grid-cols-2 lg:grid-cols-4']: !gridCol },
                            'my-5 grid gap-5'
                        )}
                    >
                        {isProductsLoading && <SmallSkeleton />}
                        {products &&
                            !Array.isArray(products.data) &&
                            products.data.docs.map((item, i) => <SmallCard product={item} key={i} />)}
                    </div>
                    <div>
                        {products?.data && !Array.isArray(products.data) && (
                            <Pagination
                                current={currentPage || 1}
                                defaultPageSize={LIMIT}
                                total={products.data.totalDocs}
                                onChange={onPageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
