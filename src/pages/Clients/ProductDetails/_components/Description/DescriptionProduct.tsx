import { Collapse, CollapseProps, ConfigProvider, Tabs, TabsProps } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWindowSize from '~/hooks/_common/useWindowSize';
import AddInformationContent from '~/pages/Clients/ProductDetails/_components/Description/AddInformationContent';
import ReviewsContent from '~/pages/Clients/ProductDetails/_components/Description/ReviewsContent';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { useTypedSelector } from '~/store/store';
import { IProductItemNew } from '~/types/Product';
import { useInView } from 'react-intersection-observer';
import DescriptionContent from '~/pages/Clients/ProductDetails/_components/Description/DescriptionContent';

const DescriptionProduct = ({ review, product }: { review: number; product: IProductItemNew }) => {
    const windowSize = useWindowSize();
    const targetToReview = useRef<HTMLDivElement>();

    const orderId = useTypedSelector((state) => state.rateProductSlice.orderId);
    const dispatch = useDispatch();

    const { ref: inViewRef, inView } = useInView({
        root: null,
        threshold: 0,
        triggerOnce: true,
        rootMargin: '100px 0px 0px 0px',
    });

    const descriptionTabKey = {
        description: '1',
        additionalInformation: '2',
        shippingReturn: '3',
        reviews: '4',
    };
    const activekey = orderId ? descriptionTabKey.reviews : descriptionTabKey.description;
    const items: TabsProps['items'] | CollapseProps['items'] = [
        {
            key: descriptionTabKey.description,
            label: 'MÔ TẢ VỀ SẢN PHẨM',
            children: <DescriptionContent description={product.description} />,
        },
        {
            key: descriptionTabKey.additionalInformation,
            label: 'THÔNG TIN BỔ SUNG',
            children: <AddInformationContent attributes={product.attributes} />,
        },
        // {
        //     key: descriptionTabKey.shippingReturn,
        //     label: 'SHIPPING & RETURN',
        //     children: <ShipReturnContent />,
        // },
        {
            key: descriptionTabKey.reviews,
            label: 'ĐÁNH GIÁ',
            children: <ReviewsContent TopReviews={review} />,
        },
    ];

    const setRefs = useCallback(
        (node: HTMLDivElement) => {
            targetToReview.current = node;
            inViewRef(node);
        },
        [inViewRef]
    );
    /* eslint-disable */
    useEffect(() => {
        if (orderId && targetToReview.current) {
            setTimeout(() => {
                document.body.classList.add('noscroll');
                targetToReview.current?.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
    }, [targetToReview]);

    useEffect(() => {
        if (inView && orderId) {
            dispatch(setReviewData({ orderId: orderId, isOpen: true }));
            document.body.classList.remove('noscroll');
        }
    }, [inView, orderId]);
    /* eslint-enable */

    return (
        <div className='product-desc  rounded-md bg-white'>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            fontSize: 18,
                            itemSelectedColor: '#16bcdc',
                            itemActiveColor: '#16bcdc',
                            itemHoverColor: '#16bcdc',
                            inkBarColor: '#16bcdc',
                        },
                        Collapse: {
                            colorBorder: 'none',
                            fontSize: 18,
                        },
                    },
                }}
            >
                <div ref={setRefs}>
                    {windowSize.windowWidth > 1024 && (
                        <Tabs
                            className='mt-[25px] w-full px-5 font-semibold'
                            items={items as TabsProps['items']}
                            defaultActiveKey={activekey}
                            centered={true}
                        ></Tabs>
                    )}
                    {windowSize.windowWidth < 1024 && (
                        <Collapse
                            defaultActiveKey={activekey}
                            items={items}
                            className='mt-[25px]'
                            expandIconPosition='end'
                        ></Collapse>
                    )}
                </div>
            </ConfigProvider>
        </div>
    );
};

export default DescriptionProduct;
