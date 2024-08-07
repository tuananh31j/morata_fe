import { FallOutlined, QuestionCircleOutlined, RiseOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Image, Progress, Space, Table, TableProps, Tabs, TabsProps, Tooltip } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WrapperList from '~/components/_common/WrapperList';
import { MAIN_ROUTES } from '~/constants/router';
import useGetProductStatsByRange from '~/hooks/stats/useGetProductStatsByRange';

import DateRangePickerComponent from '~/pages/Admins/_dashboard_/_components/Charts/RangePicker/DateRangePickerComponent';
import { Currency } from '~/utils';

type DataType = {
    '#': number;
    _id: string;
    name: string;
    image: string;
    price: number;
    totalQuantity: number;
    totalRevenue: number;
    percentageOfTotal: number;
    details: string;
};

type ProductDataType = {
    _id: string;
    name: string;
    image: string;
    price: number;
    totalQuantity: number;
    totalRevenue: number;
    percentageOfTotal: number;
};

export const TopProducts: React.FC = () => {
    const today = dayjs();

    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([today, today]);
    const { data } = useGetProductStatsByRange(dateRange[0], dateRange[1]);
    const topSellingProducts = data?.data?.topSellingProducts;
    const leastSellingProducts = data?.data?.leastSellingProducts;

    const [tableData, setTableData] = useState<DataType[]>(topSellingProducts);
    const [currentTab, setCurrentTab] = useState('top products');

    const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange(dates);
        } else {
            setDateRange([today, today]);
        }
    };

    const dataTable = () => {
        const columns: TableProps<DataType>['columns'] = [
            {
                title: <span className='text-base'>#</span>,
                dataIndex: '#',
                key: '#',
                align: 'center',
                width: '5%',
                render: (_, __, index) => {
                    return <div className='text-center font-semibold text-[#0068c9]'>{index + 1}</div>;
                },
            },
            {
                title: <span className='text-base'>Product details</span>,
                dataIndex: 'details',
                key: 'details',
                width: '50%',
                render: (_, product: ProductDataType) => (
                    <>
                        <Flex>
                            <Space>
                                <div className='flex h-15 w-15 items-center'>
                                    <Image className='h-full w-full' src={product.image} />
                                </div>

                                <div className='flex flex-col'>
                                    <Link
                                        to={`${MAIN_ROUTES.PRODUCTS}/${product._id}`}
                                        replace={true}
                                        className='flex h-[70%] items-center overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold'
                                    >
                                        {product.name}
                                    </Link>

                                    <div className='flex h-[30%] items-center text-sm font-normal text-[#64748b]'>
                                        {Currency.format(product.price)}
                                    </div>
                                </div>
                            </Space>
                        </Flex>
                    </>
                ),
            },
            {
                title: (
                    <Tooltip title='Number of products sold' color='blue' className='text-base'>
                        Sold <QuestionCircleOutlined />
                    </Tooltip>
                ),
                dataIndex: 'totalQuantity',
                key: 'totalQuantity',
                align: 'center',
                width: '10%',
                render: (text) => <div className='text-center font-normal'>{text}</div>,
            },
            {
                title: (
                    <Tooltip title='Amount of money made based on product sales' color='blue' className='text-base'>
                        Revenue <QuestionCircleOutlined />
                    </Tooltip>
                ),
                dataIndex: 'totalRevenue',
                key: 'totalRevenue',
                align: 'center',
                width: '15%',
                render: (text) => <div className='text-center font-normal'>{Currency.format(text)}</div>,
            },
            {
                title: (
                    <Tooltip
                        title='Percentage of amount sold divided by amount in stock of each respective product'
                        color='blue'
                        className='text-base'
                    >
                        Percentage <QuestionCircleOutlined />
                    </Tooltip>
                ),
                dataIndex: 'percentageOfTotal',
                key: 'percentageOfTotal',
                align: 'center',
                width: '15%',
                render: (percent) => (
                    <Progress type='circle' percent={Math.round(percent)} strokeColor='#3c50e0' size='small' />
                ),
            },
        ];

        return (
            <div>
                <div className='mt-4'>
                    <Table
                        columns={columns}
                        loading={!tableData}
                        dataSource={tableData?.map((item, index) => ({ ...item, '#': index + 1, key: item._id }))}
                        pagination={false}
                    />
                </div>
            </div>
        );
    };

    const items: TabsProps['items'] = [
        {
            key: 'top products',
            label: (
                <Space>
                    Top Sales <RiseOutlined />
                </Space>
            ),
            children: dataTable(),
        },
        {
            key: 'worst products',
            label: (
                <Space>
                    Worst Sales <FallOutlined />
                </Space>
            ),
            children: dataTable(),
        },
    ];

    const onChange = (key: string) => {
        setCurrentTab(key);
    };

    useEffect(() => {
        // Khi component mount, đảm bảo rằng dateRange có giá trị
        if (!dateRange[0] || !dateRange[1]) {
            setDateRange([today, today]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentTab === 'top products') {
            setTableData(topSellingProducts);
        } else {
            setTableData(leastSellingProducts);
        }
    }, [currentTab, topSellingProducts, leastSellingProducts, tableData]);

    return (
        <WrapperList
            title='Products Statistics'
            option={<DateRangePickerComponent onDateRangeChange={handleDateRangeChange} value={dateRange} />}
            lineButtonBox
        >
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemHoverColor: '#1890ff',
                            itemSelectedColor: '#1890ff',
                            itemColor: '#595959',
                            titleFontSize: 16,
                        },
                    },
                    token: {
                        colorPrimary: '#1890ff',
                        borderRadius: 4,
                    },
                }}
            >
                <Tabs
                    tabBarStyle={{
                        borderBottom: '2px solid #f0f0f0',
                        background: '#fff',
                        padding: '7px',
                        paddingLeft: '30px',
                        borderRadius: '6px 6px 0 0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    }}
                    defaultActiveKey='top products'
                    items={items}
                    onChange={onChange}
                />
            </ConfigProvider>
        </WrapperList>
    );
};
