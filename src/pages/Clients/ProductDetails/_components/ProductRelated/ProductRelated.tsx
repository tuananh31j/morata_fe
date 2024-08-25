import { RightOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import SmallCard from '~/components/ProductCard/SmallCard';
import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import WrapperList from '~/components/_common/WrapperList';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import { MAIN_ROUTES } from '~/constants/router';
import { useGetRelatedProduct } from '~/hooks/products/Queries/useGetRelatedProduct';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IProductItemNew } from '~/types/Product';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
const ProductRelated = ({ relatedProduct }: { relatedProduct: IAxiosResponse<IProductItemNew> }) => {
    const query = useQuery();
    const cateId = query.get('categoryId');
    const product = relatedProduct.data;
    const body = {
        cateId: product.categoryId?._id || cateId || '',
        id: product._id,
    };
    const { data: ListRelated, isLoading: relatedLoading } = useGetRelatedProduct(body);
    const productFilter = ListRelated?.data.filter((item) => item._id !== product._id);
    return (
        <>
            {!relatedLoading && (
                <WrapperList
                    classic
                    title='Sản phẩm liên quan'
                    option={
                        <Link
                            to={MAIN_ROUTES.PRODUCTS}
                            className='text-[10px] font-[500] capitalize leading-6 duration-500 hover:text-blue-800 md:text-[14px]'
                        >
                            Xem tất cả <RightOutlined className='text-[7px] md:text-[10px]' />
                        </Link>
                    }
                >
                    {relatedLoading && (
                        <>
                            <div className='flex w-full justify-between overflow-hidden'>
                                <SmallSkeleton />
                                <SmallSkeleton />
                                <SmallSkeleton />
                                <SmallSkeleton />
                                <SmallSkeleton />
                            </div>
                        </>
                    )}
                    {!relatedLoading && (
                        <CarouselDisplay>
                            {productFilter?.map((item, i: number) => {
                                return (
                                    <CarouselItem key={i}>
                                        <SmallCard product={item} />
                                    </CarouselItem>
                                );
                            })}
                        </CarouselDisplay>
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
