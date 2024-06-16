import { Button, Modal, Space, Table, TableProps, Tooltip } from 'antd';
import { useState } from 'react';
import SearchSkeleton from '~/components/_common/skeleton/SearchSkeleton';
import WrapperList from '~/components/_common/WrapperList';
import MiniProduct from '~/components/ProductCard/MiniProduct';
import useOrderDetails from '~/hooks/Queries/useOrderDetails';

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

const PopupOrderDetails = ({ id }: { id: string }) => {
    const { data, isLoading } = useOrderDetails(id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    console.log(data);
    return (
        <>
            <Tooltip placement='topLeft' title={id}>
                <Button onClick={showModal}>{String(id).slice(0, 5)}...</Button>
            </Tooltip>

            <Modal footer={''} open={isModalOpen} onCancel={handleCancel} width={1000}>
                <WrapperList className='m-0' title='Your Order&#39;s Details'>
                    <div className='grid grid-cols-2 items-start gap-4'>
                        <div>
                            {/* SHIPPING ADDRESS */}
                            <div className='mt-1'>
                                <span className='font-semibold text-[#0068c9]'>Address: </span>{' '}
                                <span>{data && Object.values(data.data.data.shippingAddress).join(', ')}</span>
                            </div>
                            {/* PAYMENT METHOD */}
                            <div className='mt-1'>
                                <Space>
                                    <span className='font-semibold text-[#0068c9]'>Payment method: </span>
                                    <span>{data && data.data.data.paymentMethod}</span>
                                </Space>
                            </div>
                            {/* SHIPPING FEE */}
                            <div className='mt-1'>
                                <Space>
                                    <span className='font-semibold text-[#0068c9]'>Shipping fee: </span>
                                    <span>{data && data.data.data.shippingFee}</span>
                                </Space>
                            </div>
                            {/* TAX */}
                            <div className='mt-1'>
                                <Space>
                                    <span className='font-semibold text-[#0068c9]'>Tax: </span>
                                    <span>{data && data.data.data.tax}</span>
                                </Space>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            {isLoading && <SearchSkeleton />}
                            {data &&
                                data.data.data.items.map((product, i) => (
                                    <MiniProduct
                                        key={i}
                                        quantity={product.quantity}
                                        productId={{
                                            _id: 'ok',
                                            name: product.name,
                                            thumbnail: product.image,
                                            discountPercentage: 1,
                                            price: product.price,
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
                </WrapperList>
            </Modal>
        </>
    );
};

export default PopupOrderDetails;
