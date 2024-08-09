import { RightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import CategoryPoPularSkeleton from '~/components/_common/skeleton/CategorySkeleton/CategoryPopular';
import MediumSkeleton from '~/components/_common/skeleton/MediumSkeleton';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import WrapperList from '~/components/_common/WrapperList';
import Banner from '~/components/Banner';
import CategoryCard from '~/components/CategoryCard';
import PopupProductList from '~/components/PopupProductList';
import MediumCard from '~/components/ProductCard/MediumCard';
import SmallCard from '~/components/ProductCard/SmallCard';
import ShopBenefits from '~/components/ShopBenefits';
import TopFeaturedProducts from '~/components/TopFeaturedProducts';
import { MAIN_ROUTES } from '~/constants/router';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useQueriesHomepage from '~/hooks/useQueriesHomepage';

const Home = () => {
    useDocumentTitle('Home');

    const [
        { data: ProductsList, isLoading: isLoadingProductsAll },
        { data: TopDeals, isLoading: isLoadingTopDeals },
        _,
        { data: ProductsLatest, isLoading: isLoadingProductsLatest },
        { data: categories, isLoading: categoriesLoading },
    ] = useQueriesHomepage();

    const AllProductsList = ProductsList?.data?.products;

    const TopDealsProductsList = TopDeals?.data;
    const LatestList = ProductsLatest?.data;
    const categoryList = categories?.data;

    return (
        <div>
            {/* @Banner*/}
            <Banner />

            {/* @ShopBenefits*/}
            <ShopBenefits />

            {/* @Hot Trending Products */}
            <WrapperList
                classic
                title='Hot Trending Products'
                option={
                    <Link
                        to={MAIN_ROUTES.PRODUCTS}
                        className='text-[10px] font-[500] capitalize leading-6 duration-500 hover:text-blue-800 md:text-[14px]'
                    >
                        View all products <RightOutlined className='text-[7px] md:text-[10px]' />
                    </Link>
                }
            >
                {isLoadingProductsAll && (
                    <>
                        <div className='flex w-full justify-between overflow-hidden'>
                            <SmallSkeleton />
                            <SmallSkeleton />
                            <SmallSkeleton />
                            <SmallSkeleton />
                            <SmallSkeleton />
                        </div>
                    </>
                )}
                {!isLoadingProductsAll && (
                    <CarouselDisplay>
                        {AllProductsList?.map((item, i: number) => {
                            return (
                                <CarouselItem key={i}>
                                    <SmallCard product={item} />
                                </CarouselItem>
                            );
                        })}
                    </CarouselDisplay>
                )}
            </WrapperList>

            {/* {/* @Top Deals Of The Day */}
            <WrapperList classic title='Top Deals Of The Day'>
                {!isLoadingTopDeals && (
                    <CarouselDisplay responsiveCustom={{ laptop: 2, tablet: 1, mobile: 1 }}>
                        {TopDealsProductsList?.map((item, i: number) => {
                            return (
                                <CarouselItem key={i}>
                                    <MediumCard product={item} />
                                </CarouselItem>
                            );
                        })}
                    </CarouselDisplay>
                )}
                {isLoadingTopDeals && (
                    <div className='flex justify-between'>
                        <MediumSkeleton />
                        <MediumSkeleton />
                    </div>
                )}
            </WrapperList>

            {/* @Popular Categories
            <WrapperList classic title='Popular Categories'>
                {categoriesLoading && (
                    <div className='flex justify-center gap-5'>
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                    </div>
                )}
                {!categoriesLoading && (
                    <div className='flex h-[151px] flex-wrap justify-center gap-5 md:justify-start'>
                        {categoryList?.map((item, index) => {
                            return <CategoryCard category={item} key={index} />;
                        })}
                    </div>
                )}
            </WrapperList> */}

            {/* @Top Featured Products */}
            <WrapperList
                classic
                title='Top Featured Products'
                option={
                    <Link
                        to={MAIN_ROUTES.PRODUCTS}
                        className='text-[10px] font-[500] capitalize leading-6 duration-500 hover:text-blue-800 md:text-[14px]'
                    >
                        View all products <RightOutlined className='text-[7px] md:text-[10px]' />
                    </Link>
                }
            >
                {!isLoadingProductsLatest && LatestList && <TopFeaturedProducts product={LatestList} />}
                {isLoadingProductsLatest && (
                    <div className='flex justify-between gap-2'>
                        <MediumSkeleton />
                        <MediumSkeleton />
                    </div>
                )}
            </WrapperList>

            {/* add popup productlist */}
            {/* {AllProductsList && <PopupProductList product={AllProductsList} propsLoading={isLoadingProductsAll} />} */}
        </div>
    );
};

export default Home;
