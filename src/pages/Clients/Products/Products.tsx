import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
import useGetProducts from '~/hooks/products/Queries/useGetProductsForAdmin';
import FilterProducts from './FilterSidebar';
import SmallCard from '~/components/ProductCard/SmallCard';
import { Empty, Pagination } from 'antd';
import SortAndViewOptions from '~/pages/Clients/Products/SortAndViewOptions';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import useFilter from '~/hooks/_common/useFilter';
import useGetAllProducts from '~/hooks/products/Queries/useGetAllProducts';
import { cn } from '~/utils';

const Products = () => {
    useDocumentTitle('Products');
    const { query, grid, updateQueryParam } = useFilter();
    // @Query
    const [{ data: brands }, { data: categoies }] = useGetCategoriesAndBrands();
    const { data: products, isLoading: isProductsLoading } = useGetAllProducts(query);

    const onPageChange = (page: number) => {
        updateQueryParam({ ...query, page: page.toString() });
    };
    return (
        <>
            <div className='block transition-all duration-300 ease-in-out md:flex md:gap-5'>
                <div className='md:w-[20%]'>
                    {categoies && brands && <FilterProducts categories={categoies.data} brands={brands.data} />}
                </div>
                <div className='w-full'>
                    <SortAndViewOptions totalProducts={products ? products.data.totalDocs : 0} />
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
                            products.data.products.map((item, i) => <SmallCard product={item} key={i} />)}
                        {!products && <Empty />}
                    </div>
                    <div>
                        {products?.data && !Array.isArray(products.data) && (
                            <Pagination
                                current={Number(query.page)}
                                pageSize={10}
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
