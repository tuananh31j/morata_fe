import { Input, Select, Space, Typography } from 'antd';

const HeaderManageOrder = () => {
    const onSearchByCustomer = (value: string) => {
        console.log(value);
    };

    const onSearchByOrderCode = (value: string) => {
        console.log(value);
    };

    return (
        <Space className='flex w-full justify-between rounded-lg bg-[#fff] p-5 text-lg font-semibold'>
            <Typography.Text className='text-lg font-bold'>Order Management</Typography.Text>
            <Space>
                <Input.Search
                    allowClear
                    size='middle'
                    onSearch={onSearchByCustomer}
                    placeholder='Enter order code...'
                />
                <Input.Search
                    allowClear
                    size='middle'
                    onSearch={onSearchByOrderCode}
                    placeholder='Enter customer name...'
                />
                <Select options={[]} placeholder='Order status' />
                <Select options={[]} placeholder='Payment Status' />
            </Space>
        </Space>
    );
};
export default HeaderManageOrder;
