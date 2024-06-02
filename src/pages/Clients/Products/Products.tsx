import { useState } from 'react';
import FilterProducts from './FilterSidebar';
import SmallCard from '~/components/ProductCard/SmallCard';
import clsx from 'clsx';
import { Pagination } from 'antd';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import SortAndViewOptions from '~/pages/Clients/Products/_components/SortAndViewOptions';
import { useSearchParams } from 'react-router-dom';
import useGetProductsByCate from '~/hooks/Queries/useGetProductsByCate';
import useGetAllProducts from '~/hooks/Queries/useGetAllProducts';

const data = [11, 1, 1, 1, 1, 1, 1, 1];
const Products = () => {
    useDocumentTitle('Products');
    const [searchParams] = useSearchParams();
    const cateId = searchParams.get('cate');
    const LIMIT = 8;

    // const {} = !!cateId ? useGetProductsByCate(cateId, { page: 1, limit: LIMIT }) : useGetAllProducts();

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
                    <FilterProducts />
                </div>
                <div className='w-full'>
                    <SortAndViewOptions
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
                        {data.map((item, i) => (
                            <SmallCard key={i} />
                        ))}
                    </div>
                    <Pagination className='text-center' defaultCurrent={1} total={500} />
                </div>
            </div>
        </>
    );
};

export default Products;
