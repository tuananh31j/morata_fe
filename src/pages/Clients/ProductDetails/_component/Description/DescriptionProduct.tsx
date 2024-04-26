import { Collapse, ConfigProvider, Tabs } from 'antd';
import useWindowSize from '~/hooks/useWindowSize';
import DescriptionContent from './DescriptionContent';
import AddInformationContent from './AddInformationContent';
import ShipReturnContent from './ShipReturnContent';
const {Panel } = Collapse
const DescriptionProduct = () => {
    const windowSize = useWindowSize()
    console.log(windowSize)
    return (
        <>
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
                            }
                        },
                    }}
                >
                    {windowSize.windowWidth > 1024 &&  <Tabs className='w-full px-5 font-semibold mt-[25px]' centered={true}>
                        {/* Description */}
                                <Tabs.TabPane tab='DESCRIPTION' key='1'>
                                    <DescriptionContent/>
                                </Tabs.TabPane>
                                {/* DDITIONAL INFORMATION */}
                                
                                <Tabs.TabPane tab='ADDITIONAL INFORMATION' key='2'>
                                    <AddInformationContent/>
                                </Tabs.TabPane>
                                {/* SHIPPING & RETURN */}
                                <Tabs.TabPane tab='SHIPPING & RETURN' key='3'>
                                    <ShipReturnContent/>
                                </Tabs.TabPane>
                                {/* REVIEWS */}
                                <Tabs.TabPane tab='REVIEWS' key='4'>
                                    <div className='product-desc-content'>
                                        <p>Product Description</p>
                                    </div>
                                </Tabs.TabPane>
                            </Tabs>}
                            {windowSize.windowWidth < 1024 && 
                                    <Collapse defaultActiveKey={['1']} className='mt-[25px]' expandIconPosition="end" >
                                    <Panel header="DESCRIPTION" key="1">
                                        <DescriptionContent/>
                                    </Panel>
                                    <Panel header="ADDITIONAL INFORMATION" key="2">
                                        <AddInformationContent/>
                                    </Panel>
                                    <Panel header="SHIPPING & RETURN" key="3">
                                        <ShipReturnContent/>
                                    </Panel>
                                    <Panel header="REVIEWS" key="4">
                                        <span>demo</span>
                                    </Panel>
                              </Collapse>
                            }
                 
                </ConfigProvider>
            </div>
        </>
    );
};

export default DescriptionProduct;
