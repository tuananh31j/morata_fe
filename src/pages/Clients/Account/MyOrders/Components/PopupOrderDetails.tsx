import { Button, Modal, Space, Table, TableProps, Tooltip } from 'antd';
import { useState } from 'react';

interface productDataType {
    key: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

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

const PopupOrderDetails = ({ value }: { value: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip placement='topLeft' title={value}>
                <Button onClick={showModal}>{String(value).slice(0, 5)}...</Button>
            </Tooltip>

            <Modal title='Your Order&#39;s Details' footer={''} open={isModalOpen} onCancel={handleCancel} width={1000}>
                <div className='font-semibold text-[#0068c9]'>Your cart&apos;s items:</div>
                <Table columns={productColumns} dataSource={productData} pagination={false} />
                {/* SHIPPING ADDRESS */}
                <div className='mt-1'>
                    <Space>
                        <span className='font-semibold text-[#0068c9]'>Address: </span> <span>api.shippingAddress</span>
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
    );
};

export default PopupOrderDetails;
