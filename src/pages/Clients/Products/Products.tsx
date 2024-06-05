import useGetCategoriesAndBrands from '~/hooks/Queries/useGetCategoriesAndBrands';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useGetProducts from '~/hooks/Queries/Products/useGetProducts';
import { useFilters } from '~/hooks/_common/useFilters';

import FilterProducts from './FilterSidebar';
import SmallCard from '~/components/ProductCard/SmallCard';
import { Pagination } from 'antd';
import SortAndViewOptions from '~/pages/Clients/Products/SortAndViewOptions';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import { cn } from '~/utils';

const Products = () => {
    useDocumentTitle('Products');
    const { queryParams, grid, updateQueryParam } = useFilters();
    // @Query
    const [{ data: brands }, { data: categoies }] = useGetCategoriesAndBrands();
    const { data: products, isLoading: isProductsLoading } = useGetProducts(queryParams);

    const onPageChange = (page: number) => {
        updateQueryParam('page', String(page));
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
                    {categoies && brands && <FilterProducts categories={categoies.data} brands={brands.data} />}
                </div>
                <div className='w-full'>
                    <SortAndViewOptions />
                    <div
                        className={cn(
                            {
                                ['grid-cols-1']: grid === '1',
                                ['grid-cols-2']: grid === '2',
                                ['grid-cols-3']: grid === '3',
                                ['grid-cols-4']: grid === '4',
                                ['grid-cols-5']: grid === '5',
                                ['grid-cols-2 lg:grid-cols-4']: !grid,
                            },
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
                                current={Number(queryParams.page)}
                                defaultPageSize={Number(queryParams.limit)}
                                total={products.data.totalPages}
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
