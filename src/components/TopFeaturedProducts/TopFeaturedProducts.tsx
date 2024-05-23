import FeatureCard from '../ProductCard/FeatureCard';
import MediumCard from '../ProductCard/MediumCard';
import Slideshow from '../_common/Slideshow';

const TopFeaturedProducts = () => {
    return (
        <div className='mx-2 items-center gap-3 lg:flex'>
            <div className='lg:w-[40%]'>
                <Slideshow ItemCard={MediumCard} />
            </div>
            <div className='grid h-full flex-1 grid-cols-3 gap-4'>
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
            </div>
        </div>
    );
};

export default TopFeaturedProducts;
