import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import WrapperList from '~/components/_common/WrapperList';
import Banner from '~/components/Banner';
import MediumCard from '~/components/ProductCard/MediumCard';
import SmallCard from '~/components/ProductCard/SmallCard';
import ShopBenefits from '~/components/ShopBenefits';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useQueriesHomepage from '~/hooks/Queries/useQueriesHomepage';
import { IProduct } from '~/types/product';

const Home = () => {
    useDocumentTitle('Home');
    // const { data: productsData } = useGetAllProducts(); // return res.data
    // console.log('from home', productsData?.data?.docs);

    const [getAllProductsList, getTopDealProductsList] = useQueriesHomepage();

    const AllProductsList = getAllProductsList?.data?.data?.docs;
    const TopDealsProductsList = getTopDealProductsList?.data?.data?.docs;

    return (
        <div>
            {/* @Banner*/}
            <Banner />

            {/* @ShopBenefits*/}
            <ShopBenefits />

            {/* @Hot Trending Products */}
            <WrapperList title='Hot Trending Products'>
                <CarouselDisplay>
                    {AllProductsList?.map((item: IProduct, i: number) => {
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
                <CarouselDisplay responsiveCustom={{ laptop: 2, tablet: 1, mobile: 1 }}>
                    {TopDealsProductsList?.map((item: IProduct, i: number) => (
                        <CarouselItem key={i}>
                            <MediumCard product={item} />
                        </CarouselItem>
                    ))}
                </CarouselDisplay>
            </WrapperList>

            {/* @Popular Categories */}
            {/* <WrapperList title='Popular Categories'>
                <CarouselDisplay>
                    {data.map((item, i) => (
                        <CarouselItem key={i}>
                            <CategoryCard />
                        </CarouselItem>
                    ))}
                </CarouselDisplay>
            </WrapperList> */}

            {/* @Top Featured Products */}
            {/* <WrapperList title='Top Featured Products'>
                <TopFeaturedProducts />
            </WrapperList> */}
            {/* add popup productlist */}
            {/* <PopupProductList /> */}
        </div>
    );
};

export default Home;
