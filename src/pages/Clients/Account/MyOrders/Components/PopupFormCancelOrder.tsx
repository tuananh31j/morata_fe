import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Modal, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import WrapperList from '~/components/_common/WrapperList';
import useCancelOrder from '~/hooks/orders/Mutations/useCancelOrder';
import showMessage from '~/utils/ShowMessage';

const schemaFormCancelOrder = z.object({
    reason: z.string({ message: 'You need to tell us the reason!' }),
    description: z.string().optional(),
});

type IFormCancelOrder = z.infer<typeof schemaFormCancelOrder>;

const PopupFormCancelOrder = ({ id }: { id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutateAsync, isSuccess, isPending } = useCancelOrder(id);
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IFormCancelOrder>({
        resolver: zodResolver(schemaFormCancelOrder),
    });

    const onSubmit: SubmitHandler<IFormCancelOrder> = async (data) => {
        try {
            const reasonCombined = data.reason.concat(data.description ? `, ${data.description}` : '');

            // const payload = {
            //     orderId: id,
            //     reason: reasonCombined,
            // };

            await mutateAsync(reasonCombined);

            // if (isSuccess) {
            //     showMessage('Cancel order successfully!', 'success');
            //     setIsModalOpen(false);
            //     reset();
            // }
        } catch (error) {
            showMessage('Something wrong!', 'error');
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
        reset();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        reset();
    };

    useEffect(() => {
        if (isSuccess) {
            showMessage('Cancel order successfully!', 'success');
            setIsModalOpen(false);
            reset();
        }
    }, [isSuccess, reset]);

    return (
        <>
            <Button onClick={showModal} type='primary' danger>
                Hủy Đơn Hàng
            </Button>
            <Modal open={isModalOpen} footer='' onCancel={handleCancel}>
                <WrapperList classic className='m-0' title='Tell us why you are cancelling this order'>
                    <Form
                        onFinish={handleSubmit(onSubmit)}
                        className='w-full'
                        name='layout-multiple-horizontal'
                        layout='vertical'
                    >
                        <Form.Item
                            validateStatus={errors.reason ? 'error' : ''}
                            help={errors.reason?.message}
                            label='Reason'
                            name='horizontal'
                            required
                        >
                            <Controller
                                name='reason'
                                control={control}
                                render={({ field }) => (
                                    <Radio.Group {...field} className='flex flex-col'>
                                        <Radio value={'Product did not meet expectations'}>
                                            Product did not meet expectations
                                        </Radio>
                                        <Radio value={'Delayed delivery time'}>Delayed delivery time</Radio>
                                        <Radio value={'Price and shipping fees'}>Price and shipping fees</Radio>
                                        <Radio value={'Change of mind or needs'}>Change of mind or needs</Radio>
                                    </Radio.Group>
                                )}
                            />
                        </Form.Item>
                        <Form.Item
                            validateStatus={errors.description ? 'error' : ''}
                            help={errors.description?.message}
                            label='Description'
                        >
                            <Controller
                                name='description'
                                control={control}
                                render={({ field }) => <TextArea {...field} rows={5} />}
                            />
                        </Form.Item>
                        <Flex align='end' justify='end' gap='small'>
                            <Button onClick={handleCancel} type='text'>
                                Cancel
                            </Button>
                            <Button htmlType='submit' loading={isPending} type='primary'>
                                Send
                            </Button>
                        </Flex>
                    </Form>
                </WrapperList>
            </Modal>
        </>
    );
};

export default PopupFormCancelOrder;
