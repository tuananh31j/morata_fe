import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import MediumSkeleton from '~/components/_common/skeleton/MediumSkeleton';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import WrapperList from '~/components/_common/WrapperList';
import Banner from '~/components/Banner';
import CategoryCard from '~/components/CategoryCard';
import MediumCard from '~/components/ProductCard/MediumCard';
import SmallCard from '~/components/ProductCard/SmallCard';
import ShopBenefits from '~/components/ShopBenefits';
import TopFeaturedProducts from '~/components/TopFeaturedProducts';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useQueriesHomepage from '~/hooks/Queries/useQueriesHomepage';
import { IProduct } from '~/types/product';

const Home = () => {
    useDocumentTitle('Home');
    // const { data: productsData } = useGetAllProducts(); // return res.data
    // console.log('from home', productsData?.data?.docs);

    const [{ data: ProductsList, isFetching: FetchingAll }, { data: TopDeals, isFetching: FetchingDeals }] =
        useQueriesHomepage();
    const AllProductsList = ProductsList?.data?.docs;
    const TopDealsProductsList = TopDeals?.data?.docs;

    return (
        <div>
            {/* @Banner*/}
            <Banner />

            {/* @ShopBenefits*/}
            <ShopBenefits />

            {/* @Hot Trending Products */}
            <WrapperList title='Hot Trending Products'>
                <CarouselDisplay>
                    {FetchingAll && (
                        <>
                            <div className='flex gap-2'>
                                <SmallSkeleton />
                                <SmallSkeleton />
                                <SmallSkeleton />
                                <SmallSkeleton />
                                <SmallSkeleton />
                            </div>
                        </>
                    )}
                    {!FetchingAll &&
                        AllProductsList?.map((item: IProduct, i: number) => {
                            return (
                                <CarouselItem key={i}>
                                    <SmallCard product={item} />
                                </CarouselItem>
                            );
                        })}
                </CarouselDisplay>
            </WrapperList>

            {/* @Top Deals Of The Day */}
            <WrapperList title='Top Deals Of The Day'>
                {!FetchingDeals && (
                    <CarouselDisplay responsiveCustom={{ laptop: 2, tablet: 1, mobile: 1 }}>
                        {TopDealsProductsList?.map((item: IProduct, i: number) => {
                            return (
                                <CarouselItem key={i}>
                                    <MediumCard product={item} />
                                </CarouselItem>
                            );
                        })}
                    </CarouselDisplay>
                )}
                {FetchingDeals && (
                    <div className='flex justify-between'>
                        <MediumSkeleton />
                        <MediumSkeleton />
                    </div>
                )}
            </WrapperList>

            {/* @Popular Categories */}
            <WrapperList title='Popular Categories'>
                <CarouselDisplay>
                    <CarouselItem>
                        <CategoryCard />
                    </CarouselItem>
                </CarouselDisplay>
            </WrapperList>

            {/* @Top Featured Products */}
            <WrapperList title='Top Featured Products'>
                {!FetchingAll && <TopFeaturedProducts product={AllProductsList} />}
                {FetchingAll && (
                    <div className='flex gap-2'>
                        <MediumSkeleton />
                        <MediumSkeleton />
                    </div>
                )}
            </WrapperList>
            {/* add popup productlist */}
            {/* <PopupProductList /> */}
        </div>
    );
};

export default Home;
