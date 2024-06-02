import Banner from '~/components/Banner';
import SmallCard from '~/components/ProductCard/SmallCard';
import ShopBenefits from '~/components/ShopBenefits';
import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import WrapperList from '~/components/_common/WrapperList';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';

const data = [1, 1, 1, 1, 1, 1, 11, 1];

const Home = () => {
    useDocumentTitle('Home');
    return (
        <div>
            {/* @Banner*/}
            <Banner />

            {/* @ShopBenefits*/}
            <ShopBenefits />

            {/* @Hot Trending Products */}
            <WrapperList title='Hot Trending Products'>
                <CarouselDisplay>
                    {data.map((item, i) => {
                        return (
                            <CarouselItem key={i}>
                                <SmallCard />
                            </CarouselItem>
                        );
                    })}
                </CarouselDisplay>
            </WrapperList>

            {/* @Top Deals Of The Day */}
            {/* <WrapperList title='Top Deals Of The Day'>
                <CarouselDisplay responsiveCustom={{ laptop: 2, tablet: 1, mobile: 1 }}>
                    {data.map((item, i) => (
                        <CarouselItem key={i}>
                            <MediumCard />
                        </CarouselItem>
                    ))}
                </CarouselDisplay>
            </WrapperList> */}

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
