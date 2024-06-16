import { Button, ConfigProvider, Form, InputNumber, Modal, Radio, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutationCart } from '~/hooks/Mutations/cart/useAddCart';
import { useGetAllAtributes } from '~/hooks/Queries/Attributes/useGetAttributesByCate';
import { RootState } from '~/store/store';
import { IProduct } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';

export default function PopupAttributes({ children, product }: { children: React.ReactNode; product: IProduct }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { data: attributes } = useGetAllAtributes(product.categoryId);
    const [valueQuantity, setQuantityValue] = useState(1);
    const { mutate, isSuccess, isPending } = useMutationCart();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const handleIncrement = () => {
        if (valueQuantity < (product ? product.stock : 0)) setQuantityValue(valueQuantity + 1);
    };
    const handleDecrement = () => {
        if (valueQuantity > 1) setQuantityValue(valueQuantity - 1);
    };
    const onChangeInputQuantity = (e: number | null) => {
        setQuantityValue(e ? e : 1);
    };

    const showModal = () => {
        setModalOpen(true);
    };
    const handleOk = () => {
        setModalOpen(false);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    const handleOnSubmit = (data: { color: string; storage: string }) => {
        if (user) {
            const bodyAddToCart = {
                productId: product._id,
                userId: user._id,
                quantity: valueQuantity,
            };
            mutate(bodyAddToCart);

            setQuantityValue(1);
        } else {
            navigate('/auth/login');
            showMessage('You need to login first!', 'warning');
        }
    };
    useEffect(() => {
        setQuantityValue(1);
        if (isSuccess) {
            handleOk();
        }
    }, [product._id, isSuccess]);
    return (
        <>
            <div onClick={showModal}>{children}</div>
            <Modal
                footer={[]}
                title={product.name}
                width={'50vw'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className='flex'>
                    <div>
                        <img src={product.thumbnail} width={425} height={425} alt='' />
                    </div>
                    <div className='w-[80%]'>
                        <div className='product-action'>
                            {/* Button add to cart and quantity */}
                            <Form onFinish={handleOnSubmit} layout='vertical'>
                                <div className='my-4'>
                                    {attributes &&
                                        attributes.data.length > 1 &&
                                        attributes.data.map((label, index) => (
                                            <Form.Item
                                                key={index}
                                                label={label.attribute}
                                                name={label.attribute.toLocaleLowerCase()}
                                                initialValue={label.details[0].value}
                                                rules={[
                                                    { required: true, message: `Please choose the ${label.attribute}` },
                                                ]}
                                            >
                                                <Radio.Group
                                                    optionType='button'
                                                    buttonStyle='solid'
                                                    className='flex flex-wrap gap-x-4 gap-y-6 border-none'
                                                >
                                                    {label.details.map((item, i) => (
                                                        <div key={i}>
                                                            <Radio
                                                                className={`${label.attribute.toLocaleLowerCase() === 'color' ? 'rounded-full' : 'rounded-sm'}`}
                                                                style={{ backgroundColor: item.value }}
                                                                value={item.value}
                                                            >
                                                                {label.attribute.toLocaleLowerCase() !== 'color' &&
                                                                    item.name}
                                                            </Radio>
                                                        </div>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        ))}
                                </div>
                                <div className=' items-center md:flex '>
                                    <div className='mb-[15px] flex w-[100%] items-center gap-[5px] md:mb-0 lg:w-[28%]'>
                                        <Button
                                            onClick={handleDecrement}
                                            disabled={valueQuantity < 2}
                                            className='h-[48px]'
                                        >
                                            -
                                        </Button>
                                        <InputNumber
                                            min={1}
                                            max={product.stock}
                                            onChange={onChangeInputQuantity}
                                            className='flex h-[48px] items-center'
                                            value={valueQuantity}
                                            controls={false}
                                        />
                                        <Button
                                            onClick={handleIncrement}
                                            disabled={valueQuantity === product.stock}
                                            className='h-[48px]'
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>
                                <div className='mt-4 w-[100%]'>
                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Button: {
                                                    defaultHoverBg: '#16bcdc',
                                                    defaultHoverColor: 'white',
                                                    defaultHoverBorderColor: 'none',
                                                },
                                            },
                                        }}
                                    >
                                        <button
                                            type='submit'
                                            className='h-[50px] w-[100%] rounded-[30px] bg-[#222222] font-bold text-white hover:bg-[#16bcdc]'
                                        >
                                            {isPending ? <Spin /> : 'Add to cart'}
                                        </button>
                                    </ConfigProvider>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
