import { Button, Form, Input, Modal, Rate } from 'antd';
import { useEffect } from 'react';
import { IReviewProductResponse } from '~/types/Review';
import { errorMessage } from '~/validation/Products/Product';

interface ReviewModalProps {
    initialValue: IReviewProductResponse;
    isModalVisible: boolean;
    isSuccessful: boolean;
    handleSubmit: (data: { rating: number; content: string }) => void;
    handleCancel: () => void;
}
const { TextArea } = Input;

const ReviewModal = ({ initialValue, isSuccessful, isModalVisible, handleSubmit, handleCancel }: ReviewModalProps) => {
    const [form] = Form.useForm();

    /* eslint-disable */
    const ratingValidator = async (_: any, rating: number) => {
        if (!rating) {
            return errorMessage('Vui lòng chọn đánh giá!');
        }
        return Promise.resolve();
    };
    const contentValidator = async (_: any, content: string) => {
        if (!content) {
            return errorMessage('Vui lòng điền nội dung đánh giá!');
        }
        if (content.length > 255) {
            return errorMessage('Reviews are limited to 255 words!');
        }

        return Promise.resolve();
    };
    const content = [
        {
            validator: contentValidator,
        },
    ];

    /* eslint-enable */

    useEffect(() => {
        if (isModalVisible) {
            form.setFieldsValue({
                rating: initialValue.rating,
                content: initialValue.content,
            });
        }
    }, [initialValue, form]);

    return (
        <Modal title='Viết đánh giá' centered open={isModalVisible} footer={null} onCancel={handleCancel}>
            {form && (
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={(reviewData) => handleSubmit({ ...reviewData, reviewId: initialValue._id })}
                >
                    <Form.Item
                        name='rating'
                        label='Rating'
                        initialValue={initialValue.rating}
                        dependencies={['rating']}
                        rules={[
                            {
                                validator: ratingValidator,
                            },
                        ]}
                    >
                        <Rate allowClear />
                    </Form.Item>
                    <Form.Item
                        name='content'
                        label='Review'
                        initialValue={initialValue.content}
                        dependencies={['content']}
                        rules={content}
                    >
                        <TextArea placeholder='Write your review' rows={4} />
                    </Form.Item>
                    <Form.Item className='mt-2'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={isSuccessful}
                            loading={isSuccessful}
                            className='w-full'
                        >
                            Đánh giá
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default ReviewModal;
