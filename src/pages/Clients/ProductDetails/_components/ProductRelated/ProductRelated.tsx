import { useQueryClient } from '@tanstack/react-query';
import SmallCard from '~/components/ProductCard/SmallCard';
import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import WrapperList from '~/components/_common/WrapperList';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import { useGetRelatedProduct } from '~/hooks/Queries/Products/useGetRelatedProduct';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IProduct } from '~/types/product';

const ProductRelated = ({ relatedProduct }: { relatedProduct: IAxiosResponse<IProduct> }) => {
    const product = relatedProduct.data;
    const body = {
        cateId: product.categoryId,
        id: product._id,
    };
    const { data: ListRelated, isLoading: relatedLoading } = useGetRelatedProduct(body);

    return (
        <>
            {!relatedLoading && (
                <WrapperList title='Related Products'>
                    <CarouselDisplay>
                        {ListRelated?.data.map((item: IProduct, i: number) => (
                            <CarouselItem key={i}>
                                <SmallCard product={item} />
                            </CarouselItem>
                        ))}
                    </CarouselDisplay>
                </WrapperList>
            )}
            {relatedLoading && (
                <div className='flex gap-2'>
                    <SmallSkeleton />
                    <SmallSkeleton />
                    <SmallSkeleton />
                </div>
            )}
        </>
    );
};

export default ProductRelated;
