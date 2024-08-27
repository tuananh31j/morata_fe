import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import MediumSkeleton from '~/components/_common/skeleton/MediumSkeleton';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import WrapperList from '~/components/_common/WrapperList';
import Banner from '~/components/Banner';
import MediumCard from '~/components/ProductCard/MediumCard';
import SmallCard from '~/components/ProductCard/SmallCard';
import ShopBenefits from '~/components/ShopBenefits';
import TopFeaturedProducts from '~/components/TopFeaturedProducts';
import { MAIN_ROUTES } from '~/constants/router';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useGetAllProductsScroll from '~/hooks/products/Queries/useGetAllProductsScroll';
import useQueriesHomepage from '~/hooks/useQueriesHomepage';

const Home = () => {
    useDocumentTitle('Trang chủ');
    const { Observer, data: ProductScroll, hasNextPage, isLoading } = useGetAllProductsScroll();
    const [
        { data: ProductsList, isLoading: isLoadingProductsAll },
        { data: TopDeals, isLoading: isLoadingTopDeals },
        { data: Toptrending, isLoading: isLoadingTrending },
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
            <Banner Category={categoryList} />

            {/* @ShopBenefits*/}
            <ShopBenefits />

            {/* @Hot Trending Products */}
            <WrapperList
                classic
                title='Top Sản phẩm theo xu hướng'
                option={
                    <Link
                        to={MAIN_ROUTES.PRODUCTS}
                        className='text-[10px] font-[500] capitalize leading-6 duration-500 hover:text-blue-800 md:text-[14px]'
                    >
                        Xem tất cả <RightOutlined className='text-[7px] md:text-[10px]' />
                    </Link>
                }
            >
                {isLoadingTrending && (
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
                {!isLoadingTrending && (
                    <CarouselDisplay>
                        {Toptrending?.data.map((item, i: number) => {
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
            <WrapperList classic title='Top Sản Phẩm Ưu Đãi'>
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
                title='Top Sản phẩm mới nhất'
                option={
                    <Link
                        to={MAIN_ROUTES.PRODUCTS}
                        className='text-[10px] font-[500] capitalize leading-6 duration-500 hover:text-blue-800 md:text-[14px]'
                    >
                        Xem tất cả <RightOutlined className='text-[7px] md:text-[10px]' />
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
            <WrapperList classic title='Gợi ý cho bạn'>
                <div className='grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5'>
                    {ProductScroll &&
                        ProductScroll.pages.map((item) => [
                            ...item.data.products.map((product) => <SmallCard key={product._id} product={product} />),
                        ])}
                </div>
                {isLoadingProductsLatest && (
                    <div className='flex justify-between gap-2'>
                        <MediumSkeleton />
                        <MediumSkeleton />
                    </div>
                )}
                <Observer />
            </WrapperList>

            {/* add popup productlist */}
            {/* {AllProductsList && <PopupProductList product={AllProductsList} propsLoading={isLoadingProductsAll} />} */}
        </div>
    );
};

export default Home;
