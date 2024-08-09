import { ConfigProvider, Table } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import WrapperList from '~/components/_common/WrapperList';
import { useTopBuyers } from '~/hooks/stats/useTopBuyers';
import DateRangePickerCard from '~/pages/Admins/_dashboard_/_components/DatePickerCard/DateRangePickerCard';
import { columns } from '~/pages/Admins/_dashboard_/_components/TopUsers/_option';

type DateInput =
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

const TopUsers: React.FC = () => {
    const [dateInput, setDateInput] = useState<DateInput>({
        type: 'range',
        start: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD'),
    });

    const { data: topBuyersData, isLoading } = useTopBuyers(dateInput);

    const handleDateChange = (newDateInput: DateInput) => {
        setDateInput(newDateInput);
    };
    console.log(topBuyersData);

    const tableData = topBuyersData?.data?.topBuyers?.map((buyer: any, index: number) => ({
        ...buyer,
        key: buyer._id,
        index: index + 1,
    }));
    return (
        <>
            <WrapperList
                title='Customers Statistics'
                lineButtonBox
                option={<DateRangePickerCard onDateChange={handleDateChange} initialDate={dateInput} />}
            >
                {/* <h1 className='font-bold text-[#3c50e0]'>Recent Orders</h1>

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
            </Flex> */}

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
                        dataSource={tableData}
                        pagination={false}
                        loading={isLoading}
                    />
                </ConfigProvider>
            </WrapperList>
        </>
    );
};

export default TopUsers;
