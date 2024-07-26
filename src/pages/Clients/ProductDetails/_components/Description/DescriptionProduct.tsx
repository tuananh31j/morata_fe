import { Collapse, ConfigProvider, Tabs } from 'antd';
import useWindowSize from '~/hooks/_common/useWindowSize';
import AddInformationContent from '~/pages/Clients/ProductDetails/_components/Description/AddInformationContent';
import ReviewsContent from '~/pages/Clients/ProductDetails/_components/Description/ReviewsContent';

const { Panel } = Collapse;
const DescriptionProduct = ({ review }: { review: number }) => {
    const windowSize = useWindowSize();
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
                {windowSize.windowWidth > 1024 && (
                    <Tabs className='mt-[25px] w-full px-5 font-semibold' centered={true}>
                        {/* Description */}
                        {/* <Tabs.TabPane tab='DESCRIPTION' key='1'>
                            <DescriptionContent />
                        </Tabs.TabPane> */}
                        {/* ADDITIONAL INFORMATION */}

                        <Tabs.TabPane tab='ADDITIONAL INFORMATION' key='2'>
                            <AddInformationContent />
                        </Tabs.TabPane>
                        {/* SHIPPING & RETURN */}
                        {/* <Tabs.TabPane tab='SHIPPING & RETURN' key='3'>
                            <ShipReturnContent />
                        </Tabs.TabPane> */}
                        {/* REVIEWS */}
                        <Tabs.TabPane tab='REVIEWS' key='4'>
                            <ReviewsContent TopReviews={review} />
                        </Tabs.TabPane>
                    </Tabs>
                )}
                {windowSize.windowWidth < 1024 && (
                    <Collapse defaultActiveKey={['1']} className='mt-[25px]' expandIconPosition='end'>
                        {/* <Panel header='DESCRIPTION' key='1'>
                            <DescriptionContent />
                        </Panel> */}
                        <Panel header='ADDITIONAL INFORMATION' key='2'>
                            <AddInformationContent />
                        </Panel>
                        {/* <Panel header='SHIPPING & RETURN' key='3'>
                            <ShipReturnContent />
                        </Panel> */}
                        <Panel header='REVIEWS' key='4'>
                            <ReviewsContent TopReviews={review} />
                        </Panel>
                    </Collapse>
                )}
            </ConfigProvider>
        </div>
    );
};

export default DescriptionProduct;
