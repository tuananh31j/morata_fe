import { Collapse, ConfigProvider, Tabs, TabsProps } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWindowSize from '~/hooks/_common/useWindowSize';
import AddInformationContent from '~/pages/Clients/ProductDetails/_components/Description/AddInformationContent';
import ReviewsContent from '~/pages/Clients/ProductDetails/_components/Description/ReviewsContent';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { useTypedSelector } from '~/store/store';
import { IProductItemNew } from '~/types/Product';
import { useInView } from 'react-intersection-observer';

const { Panel } = Collapse;
const DescriptionProduct = ({ review, product }: { review: number; product: IProductItemNew }) => {
    const windowSize = useWindowSize();
    const targetToReview = useRef<HTMLDivElement>();

    const orderId = useTypedSelector((state) => state.rateProductSlice.orderId);
    const dispatch = useDispatch();

    const { ref: inViewRef, inView } = useInView({
        root: null,
        threshold: 0,
        triggerOnce: true,
    });

    const descriptionTabKey = {
        description: '1',
        additionalInformation: '2',
        shippingReturn: '3',
        reviews: '4',
    };
    const activekey = orderId ? descriptionTabKey.reviews : descriptionTabKey.additionalInformation;
    const items: TabsProps['items'] = [
        // {
        //     key: descriptionTabKey.description,
        //     label: 'DESCRIPTION',
        //     children: <DescriptionContent />,
        // },
        {
            key: descriptionTabKey.additionalInformation,
            label: 'ADDITIONAL INFORMATION',
            children: <AddInformationContent attributes={product.attributes} />,
        },
        // {
        //     key: descriptionTabKey.shippingReturn,
        //     label: 'SHIPPING & RETURN',
        //     children: <ShipReturnContent />,
        // },
        {
            key: descriptionTabKey.reviews,
            label: 'REVIEWS',
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
                targetToReview.current?.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
    }, [targetToReview]);

    useEffect(() => {
        if (inView && orderId) {
            dispatch(setReviewData({ orderId: orderId, isOpen: true }));
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
                            items={items}
                            defaultActiveKey={activekey}
                            centered={true}
                        ></Tabs>
                    )}
                    {windowSize.windowWidth < 1024 && (
                        <Collapse defaultActiveKey={['1']} className='mt-[25px]' expandIconPosition='end'>
                            {/* <Panel header='DESCRIPTION' key='1'>
                            <DescriptionContent />
                        </Panel> */}
                            <Panel header='ADDITIONAL INFORMATION' key='2'>
                                <AddInformationContent attributes={product.attributes} />
                            </Panel>
                            {/* <Panel header='SHIPPING & RETURN' key='3'>
                            <ShipReturnContent />
                        </Panel> */}
                            <Panel header='REVIEWS' key='4'>
                                <ReviewsContent TopReviews={review} />
                            </Panel>
                        </Collapse>
                    )}
                </div>
            </ConfigProvider>
        </div>
    );
};

export default DescriptionProduct;
