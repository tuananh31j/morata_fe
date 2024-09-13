import { CloseOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '~/hooks/_common/useWindowSize';
import SmallCard from '../ProductCard/SmallCard';
import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import { MAIN_ROUTES } from '~/constants/router';
import { IProductItemNew } from '~/types/Product';

// fake quantity data get api new product
const PopupProductList = ({ product, propsLoading }: { product: IProductItemNew[]; propsLoading: boolean }) => {
    const [open, setOpen] = useState(false);
    const windowsize = useWindowSize();
    useEffect(() => {
        if (windowsize.windowWidth > 768) {
            const timeoutId = setTimeout(() => {
                setOpen(true);
            }, 4000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
        return () => {};
    }, [windowsize.windowWidth]);
    return (
        <>
            {/* ConfigProvider custom mask color */}
            <ConfigProvider
                theme={{
                    token: {
                        colorBgMask: 'rgba(0,0,0,0.7)',
                    },
                }}
            >
                <Modal
                    closeIcon={false}
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={950}
                    // Footer custom button view all product
                    footer={[
                        <div key='cancel' className='mb-[25px] flex w-full justify-center'>
                            <Link to={MAIN_ROUTES.PRODUCTS}>
                                <div className='flex h-[50px] w-[182px] items-center justify-center  rounded-[30px] bg-[#222222] text-[12px] font-semibold text-white duration-500 hover:bg-cyan-500'>
                                    VIEW ALL PRODUCTS
                                </div>
                            </Link>
                        </div>,
                    ]}
                >
                    {/* closed button relative */}
                    <div className='relative w-full text-[19px] xl:w-[100%]  '>
                        <CloseOutlined
                            onClick={() => setOpen(false)}
                            className='absolute -right-7 -top-14 cursor-pointer rounded-full bg-white px-[8px] py-[8px] duration-700 hover:rotate-180 hover:text-cyan-500 xl:-right-14'
                        />
                    </div>
                    {/* title on modal */}
                    <div>
                        <span className='border-b-[2px] border-cyan-500 pb-[10px] text-[24px] font-medium'>
                            Top Pick For You
                        </span>
                    </div>
                    {/* Content modal */}
                    <div className='mt-[25px]'>
                        <CarouselDisplay responsiveCustom={{ laptop: 4, tablet: 4 }}>
                            {propsLoading && (
                                <>
                                    <div className='flex gap-2'>
                                        <SmallSkeleton />
                                        <SmallSkeleton />
                                        <SmallSkeleton />
                                        <SmallSkeleton />
                                        <SmallSkeleton />
                                    </div>
                                </>
                            )}
                            {!propsLoading &&
                                product?.map((item) => {
                                    return (
                                        <CarouselItem key={item._id}>
                                            <SmallCard product={item} />
                                        </CarouselItem>
                                    );
                                })}
                        </CarouselDisplay>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    );
};

export default PopupProductList;
