import { Button, Modal, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { useState } from 'react';

interface orderDataType {
    key: string;
    orderID: string;
    status: string;
    date: string;
    total: number;
}

interface productDataType {
    key: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

const orderData: orderDataType[] = [
    {
        key: '1',
        orderID: 'ID-1',
        status: 'Pending',
        date: '1/1/2024',
        total: 300,
    },
    {
        key: '2',
        orderID: 'asd',
        status: 'Confirmed',
        date: '1/1/2024',
        total: 300,
    },
    {
        key: '3',
        orderID: 'zxc',
        status: 'On Delivery',
        date: '1/1/2024',
        total: 500,
    },
];

const productData: productDataType[] = [
    {
        key: '1',
        name: 'prod 1',
        image: 'img1',
        price: 100,
        quantity: 5,
    },
    {
        key: '2',
        name: 'prod 2',
        image: 'img2',
        price: 300,
        quantity: 2,
    },
];

const OrderTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const productColumns: TableProps<productDataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (img) => <img src={img} alt='' />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];

    const orderColumns: TableProps<orderDataType>['columns'] = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'ID',
            dataIndex: 'orderID',
            key: 'orderID',
            render: (id) => <div>{id}</div>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'dates',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (total) => <div>${total}</div>,
        },
        {
            title: 'Details',
            key: 'details',
            render: () => (
                <>
                    <Button type='primary' onClick={showModal}>
                        Details
                    </Button>

                    <Modal title='Your Order&#39;s Details' open={isModalOpen} onOk={handleOk} width={1000}>
                        <div className='font-semibold text-[#0068c9]'>Your cart&apos;s items:</div>
                        <Table columns={productColumns} dataSource={productData} pagination={false} />

                        {/* SHIPPING ADDRESS */}
                        <div className='mt-1'>
                            <Space>
                                <span className='font-semibold text-[#0068c9]'>Address: </span>{' '}
                                <span>api.shippingAddress</span>
                            </Space>
                        </div>

                        {/* PAYMENT METHOD */}
                        <div className='mt-1'>
                            <Space>
                                <span className='font-semibold text-[#0068c9]'>Payment method: </span>
                                <span>api.paymentMethod</span>
                            </Space>
                        </div>

                        {/* SHIPPING FEE */}
                        <div className='mt-1'>
                            <Space>
                                <span className='font-semibold text-[#0068c9]'>Shipping fee: </span>
                                <span>api.shippingFee</span>
                            </Space>
                        </div>

                        {/* TAX */}
                        <div className='mt-1'>
                            <Space>
                                <span className='font-semibold text-[#0068c9]'>Tax: </span>
                                <span>api.tax</span>
                            </Space>
                        </div>
                    </Modal>
                </>
            ),
        },
    ];

    return (
        <>
            <Table columns={orderColumns} dataSource={orderData} pagination={false} />
        </>
    );
};

export default OrderTable;
