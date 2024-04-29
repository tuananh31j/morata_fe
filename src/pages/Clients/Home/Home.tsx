import Banner from '~/components/Banner';
import SmallCard from '~/components/Product/SmallCard';
import MediumCard from '~/components/Product/MediumCard';
import WrapperList from '~/components/WrapperList';
import CategoryCard from '~/components/CategoryCard';
import ShopBenefits from '~/components/ShopBenefits';
import CarouselDisplay, { CarouselItem } from '~/components/CarouselDisplay';
import TopFeaturedProducts from '~/components/TopFeaturedProducts';
import PopupProductList from '~/components/PopupProductList';
const data = [1, 1, 1, 1, 1, 1, 11, 1];

const Home = () => {
    return (
        <div>
            {/*@ Banner */}
            <Banner />

            {/*@ ShopBenefits */}
            <ShopBenefits />

            {/*@ Hot Trending Products */}
            <WrapperList title='Hot Trending Products'>
                <CarouselDisplay>
                    {data.map((item, i) => (
                        <CarouselItem key={i}>
                            <SmallCard />
                        </CarouselItem>
                    ))}
                </CarouselDisplay>
            </WrapperList>

            {/*@ Top Deals Of The Day */}
            <WrapperList title='Top Deals Of The Day'>
                <CarouselDisplay responsiveCustom={{ laptop: 2, tablet: 1, mobile: 1 }}>
                    {data.map((item, i) => (
                        <CarouselItem key={i}>
                            <MediumCard />
                        </CarouselItem>
                    ))}
                </CarouselDisplay>
            </WrapperList>

            {/*@ Popular Categories */}
            <WrapperList title='Popular Categories'>
                <CarouselDisplay>
                    {data.map((item, i) => (
                        <CarouselItem key={i}>
                            <CategoryCard />
                        </CarouselItem>
                    ))}
                </CarouselDisplay>
            </WrapperList>

            {/*@ Top Featured Products */}
            <WrapperList title='Top Featured Products'>
                <TopFeaturedProducts />
            </WrapperList>
            {/* add popup productlist */}
            <PopupProductList/>
        </div>
    );
};

export default Home;
