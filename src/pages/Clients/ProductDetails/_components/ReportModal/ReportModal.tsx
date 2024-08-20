import { Button, Form, Input, Modal, Radio, RadioChangeEvent, Space } from 'antd';
import { useEffect, useState } from 'react';
import { ReportReason } from '~/constants/enum';
import { ReportData } from '~/types/Review';
import { errorMessage } from '~/validation/Products/Product';

interface ReviewModalProps {
    isModalVisible: boolean;
    isSuccessful: boolean;
    handleSubmit: (data: ReportData) => void;
    handleCancel: () => void;
}
const { TextArea } = Input;

const ReviewModal = ({ isSuccessful, isModalVisible, handleSubmit, handleCancel }: ReviewModalProps) => {
    const [form] = Form.useForm();
    const [isOtherOpen, setIsOtherOpen] = useState<boolean>(false);
    const reason = [
        { label: ReportReason.InappropriateContent, value: ReportReason },
        { label: ReportReason.Spam, value: ReportReason.Spam },
        { label: ReportReason.Harassment, value: ReportReason.Harassment },
        { label: ReportReason.OffensiveLanguage, value: ReportReason.OffensiveLanguage },
        { label: ReportReason.Misinformation, value: ReportReason.Misinformation },
        { label: ReportReason.advertisement, value: ReportReason.advertisement },
        { label: ReportReason.Other, value: ReportReason.Other },
    ];

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

    const onChange = (e: RadioChangeEvent) => {
        setIsOtherOpen(e.target.value === ReportReason.Other ? true : false);
    };

    useEffect(() => {
        if (!isSuccessful) {
            form.resetFields();
        }
    }, [isSuccessful]);
    return (
        <Modal title='Báo cáo' centered open={isModalVisible} footer={null} onCancel={handleCancel}>
            {form && (
                <Form layout='vertical' form={form} onFinish={(reportData) => handleSubmit({ ...reportData })}>
                    <Form.Item
                        name='reason'
                        dependencies={['rating']}
                        rules={[
                            {
                                validator: ratingValidator,
                            },
                        ]}
                    >
                        <Radio.Group onChange={onChange}>
                            <Space direction='vertical'>
                                {reason.map((option, index) => (
                                    <Radio key={index} value={option.value}>
                                        {option.label}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                    {isOtherOpen && (
                        <Form.Item name='content' label='Lý do khác' dependencies={['content']} rules={content}>
                            <TextArea placeholder='Lý do' rows={4} />
                        </Form.Item>
                    )}
                    <Form.Item className='mt-2'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={isSuccessful}
                            loading={isSuccessful}
                            className='w-full'
                        >
                            Báo cáo
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};

export default ReviewModal;
