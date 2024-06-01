import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
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
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useQueriesHomepage from '~/hooks/Queries/useQueriesHomepage';
import { IProduct } from '~/types/product';

const Home = () => {
    useDocumentTitle('Home');
    // const { data: productsData } = useGetAllProducts(); // return res.data
    // console.log('from home', productsData?.data?.docs);

    const [{ data: ProductsList, isLoading: LoadingAll }, { data: TopDeals, isLoading: LoadingDeals }] =
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
                    {LoadingAll && (
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
                    {!LoadingAll &&
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
                {!LoadingDeals && (
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
                {LoadingDeals && (
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
                {!LoadingDeals && <TopFeaturedProducts product={AllProductsList} />}
                {LoadingDeals && (
                    <div className='flex gap-2'>
                        <MediumSkeleton />
                        <MediumSkeleton />
                    </div>
                )}
            </WrapperList>
            {/* add popup productlist */}
            <PopupProductList product={TopDealsProductsList} propsLoading={LoadingDeals} />
        </div>
    );
};

export default Home;
