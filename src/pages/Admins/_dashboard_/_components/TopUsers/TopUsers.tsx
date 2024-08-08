import { CreditCardTwoTone, DollarCircleTwoTone, EllipsisOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Card, ConfigProvider, Flex, Image, Progress, Space, Table, TableProps, Tooltip } from 'antd';
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

const TopUsers: React.FC = () => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: <span className='text-base'>#</span>,
            dataIndex: '#',
            key: '#',
            align: 'center',
            width: '10%',
            render: (_, __, index) => {
                return <div className='text-center font-semibold text-[#0068c9]'>{index + 1}</div>;
            },
        },
        {
            title: <span className='text-base'>Customer&apos;s name</span>,
            dataIndex: 'details',
            key: 'details',
            width: '30%',
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
                <Tooltip title='Amount of successful orders made by the customer' color='blue' className='text-base'>
                    Total orders <QuestionCircleOutlined />
                </Tooltip>
            ),
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            align: 'center',
            width: '15%',
            render: (text) => <div className='text-center font-normal'>{text}</div>,
        },
        {
            title: (
                <Tooltip title='Amount of money the customer has spent' color='blue' className='text-base'>
                    Spent <QuestionCircleOutlined />
                </Tooltip>
            ),
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
            align: 'center',
            width: '30%',
            render: (text) => <div className='text-center font-normal'>{Currency.format(text)}</div>,
        },
        {
            title: <span className='text-base'>Percentage</span>,
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
        <WrapperList title='Customers Statistics' lineButtonBox>
            <h1 className='font-bold text-[#3c50e0]'>Recent Orders</h1>

            <Flex className='my-3 items-center' gap={16}>
                <Card className='w-1/2 px-5'>
                    <Flex>
                        <div className='w-[25%]'>
                            <div className='text-base'>Customer name</div>

                            <div className='text-sm'>order date</div>
                        </div>

                        <div className='flex w-[20%] items-center justify-center text-base hover:text-[#3c50e0]'>
                            <CreditCardTwoTone className='text-2xl' />
                        </div>

                        <div className='flex w-[20%] items-center justify-center text-base font-semibold'>
                            {Currency.format(4000)}
                        </div>

                        <div className='flex w-[25%] items-center justify-center text-base'>
                            <Alert message='done' type='success' />
                        </div>

                        <div className='flex w-[10%] items-center justify-center'>
                            <Tooltip title='View details' color='blue'>
                                <Button shape='circle' icon={<EllipsisOutlined className='text-xl' />} />
                            </Tooltip>
                        </div>
                    </Flex>
                </Card>

                <Card className='w-1/2'>
                    <Flex className='p-0'>
                        <div className='w-[25%]'>
                            <div className='text-base'>Customer name</div>

                            <div className='text-sm'>order date</div>
                        </div>

                        <div className='flex w-[20%] items-center justify-center text-base'>
                            <DollarCircleTwoTone className='text-2xl' />
                        </div>

                        <div className='flex w-[20%] items-center justify-center text-base font-semibold'>
                            {Currency.format(4000)}
                        </div>

                        <div className='flex w-[25%] items-center justify-center text-base'>
                            <Alert message='pending' type='info' />
                        </div>

                        <div className='flex w-[10%] items-center justify-center'>
                            <Tooltip title='View details' color='blue'>
                                <Button shape='circle' icon={<EllipsisOutlined className='text-xl' />} />
                            </Tooltip>
                        </div>
                    </Flex>
                </Card>
            </Flex>

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
                <h1 className='font-bold text-[#3c50e0]'>Top Customers</h1>

                <Table
                    className='my-3'
                    columns={columns}
                    // dataSource={tableData?.map((item, index) => ({ ...item, '#': index + 1, key: item._id }))}
                    pagination={false}
                />
            </ConfigProvider>
        </WrapperList>
    );
};

export default TopUsers;
