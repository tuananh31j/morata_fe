import { CheckOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal, Spin } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useConfirmOrder from '~/hooks/orders/Mutations/useConfirmOrder';
import { IOrderDetails } from '~/types/Order';

export default function PopupConfirmOrder({ children, order }: { children: React.ReactNode; order: IOrderDetails }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const { mutateAsync, isPending } = useConfirmOrder();
    const showModal = () => {
        setModalOpen(true);
    };
    const handleCancel = () => {
        setModalOpen(false);
    };
    const handleConfirmOrder = async () => {
        if (id) {
            await mutateAsync(id);
            setModalOpen(false);
        }
    };

    return (
        <>
            <span
                className='cursor-pointer rounded-md bg-blue-700 px-3 py-2 text-sm font-medium text-white shadow-md'
                onClick={showModal}
            >
                {children}
            </span>
            <Modal
                footer={[
                    <>
                        <button
                            onClick={handleCancel}
                            className='h-[42px] w-[82px] rounded-lg  bg-[#7777] bg-white duration-300 hover:bg-red hover:text-white'
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmOrder}
                            className='ml-4 h-[42px] w-[82px] rounded-lg bg-blue-500 text-white duration-300 hover:bg-blue-700'
                        >
                            {isPending ? (
                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorPrimary: 'red',
                                        },
                                    }}
                                >
                                    <Spin />
                                </ConfigProvider>
                            ) : (
                                'Confirm'
                            )}
                        </button>
                    </>,
                ]}
                centered
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <div className='mb-6 flex flex-col items-center'>
                    <div className='flex flex-col items-center gap-2'>
                        <CheckOutlined className=' rounded-full border-2 p-5 text-4xl' />
                        <h3 className='text-xl font-medium text-blue-700'>Would you like to confirm this order?</h3>
                    </div>
                </div>
            </Modal>
        </>
    );
}
