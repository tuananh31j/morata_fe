import Banner from '~/components/Banner';
import ButtonBackToTop from '~/components/ButtonBackToTop';
import FeatureCard from '~/components/Product/FeatureCard';
import SmallCard from '~/components/Product/SmallCard';
import MediumCard from '~/components/Product/MediumCard';
import WrapperList from '~/components/WrapperList';
import CategoryCard from '~/components/CategoryCard';
import ShopBenefits from '~/components/ShopBenefits';

const Home = () => {
    return (
        <div>
            <Banner />
            <ShopBenefits />
            <WrapperList
                seeMore={{ path: '', name: 'Xem Thêm' }}
                CardItem={SmallCard}
                title='Hot Trending Products'
                data={[1, 2, 2, 2, 2, 2, 2, 2, 2]}
            />
            <WrapperList CardItem={CategoryCard} title='Popular Categories' data={[1, 2, 3, 4]} />
            <WrapperList
                seeMore={{ path: '', name: 'Xem Thêm' }}
                CardItem={MediumCard}
                title='Top Deals Of The Day'
                data={[1, 2]}
            />
            <WrapperList data={[1, 2, 2, 2, 2, 2, 2]} title='Top Featured Products' CardItem={FeatureCard} flex />
            <ButtonBackToTop />
        </div>
    );
};

export default Home;
