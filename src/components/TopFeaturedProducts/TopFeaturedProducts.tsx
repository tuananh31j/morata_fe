import { IProductItemNew } from '~/types/Product';
import FeatureCard from '../ProductCard/FeatureCard';
import MediumCard from '../ProductCard/MediumCard';
import Slideshow from '../_common/Slideshow';

const TopFeaturedProducts = ({ product }: { product: IProductItemNew[] }) => {
    return (
        <div className='mx-2 items-center gap-5 lg:grid lg:grid-cols-12'>
            <div className='rounded-md border border-transparent shadow-1 shadow-graydark lg:col-span-5'>
                <Slideshow ItemCard={MediumCard} Products={product} />
            </div>
            <div className='grid grid-cols-3 gap-5 lg:col-span-7'>
                {product?.map((item, i) => i < 6 && <FeatureCard key={i} product={item} />)}
            </div>
        </div>
    );
};

export default TopFeaturedProducts;
