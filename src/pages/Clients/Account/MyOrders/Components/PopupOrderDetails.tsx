import { Button, Modal, Space, Tooltip } from 'antd';
import { useState } from 'react';
import SearchSkeleton from '~/components/_common/skeleton/SearchSkeleton';
import WrapperList from '~/components/_common/WrapperList';
import MiniProduct from '~/components/ProductCard/MiniProduct';
import useOrderDetails from '~/hooks/orders/Queries/useOrderDetails';

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
                <WrapperList classic className='m-0' title='Your Order&#39;s Details'>
                    <div className='grid grid-cols-2 items-start gap-10'>
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
