import { CheckOutlined } from '@ant-design/icons';
import { UseMutateFunction } from '@tanstack/react-query';
import { ConfigProvider, Modal, Spin } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IOrderDetails } from '~/types/Order';

export default function PopupStatusOrder({
    children,
    order,
    mutate,
    isPending,
    content,
}: {
    children: React.ReactNode;
    order: IOrderDetails;
    mutate: UseMutateFunction<string, Error, string, unknown>;
    isPending?: boolean;
    content: {
        title: string;
        description?: string;
        btnYes?: string;
        btnCancel?: string;
    };
}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    console.log(isPending);
    const showModal = () => {
        setModalOpen(true);
    };
    const handleCancel = () => {
        setModalOpen(false);
    };
    const handleFinish = () => {
        if (id) {
            mutate(id);
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
                            {content.btnCancel ? content.btnCancel : 'Cancel'}
                        </button>
                        <button
                            onClick={handleFinish}
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
                                `${content.btnYes ? content.btnYes : 'Yes'}`
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
                        <h3 className='text-xl font-medium text-blue-700'>{content.title}</h3>
                        {content.description && <p>{content.description}</p>}
                    </div>
                </div>
            </Modal>
        </>
    );
}
