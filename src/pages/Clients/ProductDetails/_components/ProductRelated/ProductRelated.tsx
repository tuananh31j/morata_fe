import SmallCard from '~/components/ProductCard/SmallCard';
import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import WrapperList from '~/components/_common/WrapperList';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import { useGetRelatedProduct } from '~/hooks/Queries/Products/useGetRelatedProduct';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IProduct } from '~/types/Product';

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
                    {ListRelated && (
                        <CarouselDisplay>
                            {ListRelated?.data.map((item: IProduct, i: number) => (
                                <CarouselItem key={i}>
                                    <SmallCard product={item} />
                                </CarouselItem>
                            ))}
                        </CarouselDisplay>
                    )}
                    {!ListRelated?.data.length && (
                        <div className='flex h-[344px] items-center justify-center '>
                            <h3 className='text-xl font-semibold'>There are no related products</h3>
                        </div>
                    )}
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
