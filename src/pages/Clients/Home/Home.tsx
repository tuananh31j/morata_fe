import Banner from '~/components/Banner';
import FeatureCard from '~/components/Product/FeatureCard';
import SmallCard from '~/components/Product/SmallCard';
import MediumCard from '~/components/Product/MediumCard';
import WrapperList from '~/components/WrapperList';

const Home = () => {
    return (
        <div>
            <Banner />
            <WrapperList
                seeMore={{ path: '', name: 'Xem Thêm' }}
                CardItem={SmallCard}
                title='Hot Trending Products'
                data={[1, 2, 2, 2, 2, 2, 2, 2, 2]}
            />
            <WrapperList
                seeMore={{ path: '', name: 'Xem Thêm' }}
                CardItem={FeatureCard}
                title='Popular Categories'
                data={[1, 2, 2, 2, 2, 2, 2, 2, 2]}
            />
            <WrapperList
                seeMore={{ path: '', name: 'Xem Thêm' }}
                CardItem={MediumCard}
                title='Top Deals Of The Day'
                data={[1, 2]}
            />
            <WrapperList data={[1, 2, 2, 2, 2, 2, 2]} title='Top Featured Products' CardItem={FeatureCard} flex />
        </div>
    );
};

export default Home;
