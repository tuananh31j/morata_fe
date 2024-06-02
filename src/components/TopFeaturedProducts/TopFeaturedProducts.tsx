import { IProduct } from '~/types';
import FeatureCard from '../ProductCard/FeatureCard';
import MediumCard from '../ProductCard/MediumCard';
import Slideshow from '../_common/Slideshow';

const TopFeaturedProducts = ({ product }: { product: IProduct[] }) => {
    return (
        <div className='mx-2 items-center gap-3 lg:flex'>
            <div className='lg:w-[40%]'>
                <Slideshow ItemCard={MediumCard} Products={product} />
            </div>
            <div className='grid h-full flex-1 grid-cols-3 gap-4'>
                {product?.map((item: IProduct, i: number) => i < 6 && <FeatureCard key={i} product={item} />)}
            </div>
        </div>
    );
};

export default TopFeaturedProducts;
