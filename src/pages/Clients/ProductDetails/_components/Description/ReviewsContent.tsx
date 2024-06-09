import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Modal, Rate } from 'antd';
import { useState } from 'react';
import RatingDisplay from '~/components/_common/RatingDisplay';

const { TextArea } = Input;
const demoReview = [
    {
        _id: '665c2a41ef3298410230be70',
        rating: 5,
        content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        userId: {
            _id: '6654b44c014eafa882a4ca14',
            username: 'Quốc',
        },
        productId: '665376a6180e66741bb67cb4',
        createdAt: '2024-06-02T08:16:01.453Z',
        updatedAt: '2024-06-02T08:16:01.453Z',
    },
    {
        _id: '665c2a41ef3298410230be70',
        rating: 2.5,
        content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        userId: {
            _id: '6654b44c014eafa882a4ca14',
            username: 'Tạ Hiếu',
        },
        productId: '665376a6180e66741bb67cb4',
        createdAt: '2024-06-02T08:16:01.453Z',
        updatedAt: '2024-06-02T08:16:01.453Z',
    },
    {
        _id: '665c2a41ef3298410230be70',
        rating: 2.5,
        content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
        userId: {
            _id: '6654b44c014eafa882a4ca14',
            username: 'Tuấn Anh',
        },
        productId: '665376a6180e66741bb67cb4',
        createdAt: '2024-06-02T08:16:01.453Z',
        updatedAt: '2024-06-02T08:16:01.453Z',
    },
    {
        _id: '665c2a41ef3298410230be70',
        rating: 2.5,
        content:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer ',
        userId: {
            _id: '6654b44c014eafa882a4ca14',
            username: 'Minh Quang',
        },
        productId: '665376a6180e66741bb67cb4',
        createdAt: '2024-06-02T08:16:01.453Z',
        updatedAt: '2024-06-02T08:16:01.453Z',
    },
];
export default function ReviewsContent() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [contentSee, setContentSee] = useState<{ [index: number]: boolean }>({});
    const handleAddreview = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleSubmit = (e: { rating: number; content: string }) => {
        console.log(e);
    };
    const toggleSeeMore = (index: number) => {
        setContentSee({ ...contentSee, [index]: !contentSee[index] });
    };
    return (
        <>
            <h3 className='my-6 text-center text-xl'>Customer Reviews</h3>
            <div>
                <div className='mx-auto flex max-w-[1280px] flex-col items-center gap-4 lg:flex-row lg:justify-between'>
                    <div>
                        <div className='flex gap-2'>
                            <Rate allowHalf defaultValue={5} disabled={true} />
                            <span className='text-base font-medium  text-[#777777]'>5.00 out of 5</span>
                        </div>
                        <p className='text-center text-base font-medium text-[#777777] lg:text-start'>
                            Base on 1 reviews
                        </p>
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={5} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>( 1 Reviews)</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={4} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>( 0 Reviews)</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={3} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>( 0 Reviews)</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={2} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>( 0 Reviews)</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={1} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>( 0 Reviews)</span>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleAddreview}
                            className='flex h-[40px] w-[240px] items-center justify-center bg-[#ffb800] font-bold text-white'
                        >
                            Write a review
                        </button>
                    </div>
                </div>
                <div className='mx-4 mt-6 max-h-[70vh] overflow-y-scroll '>
                    {demoReview.map((item, index) => (
                        <>
                            <div key={index} className='mb-6 flex flex-col gap-2'>
                                <Rate allowHalf defaultValue={item.rating} className='text-[16px]' />
                                <div>
                                    <div className='flex gap-2'>
                                        <Avatar
                                            shape='square'
                                            size={32}
                                            icon={<UserOutlined className='text-yellow-500' />}
                                        />
                                        <span className='text-[14px] text-yellow-500'>{item.userId.username}</span>
                                    </div>
                                    <div className='no-scrollbar mt-2  overflow-y-scroll'>
                                        <p
                                            className={`text-[16px]  text-[#777777] ${contentSee[index] ? '' : 'line-clamp-2'}`}
                                        >
                                            {item.content}
                                        </p>
                                        {item.content.length > 200 && !contentSee[index] && (
                                            <button
                                                onClick={() => toggleSeeMore(index)}
                                                className='text-[14px] text-cyan-500 hover:underline'
                                            >
                                                See More
                                            </button>
                                        )}
                                        {contentSee[index] && (
                                            <button
                                                onClick={() => toggleSeeMore(index)}
                                                className='text-[14px] text-cyan-500 hover:underline'
                                            >
                                                See Less
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>

            <Modal title='Write a review' open={isModalVisible} footer={null} onCancel={handleCancel}>
                <Form layout='vertical' onFinish={handleSubmit}>
                    <Form.Item
                        name='rating'
                        label='Rating'
                        rules={[{ required: true, message: 'Please input your rating!' }]}
                    >
                        <Rate defaultValue={0} allowHalf />
                    </Form.Item>
                    <Form.Item
                        name='content'
                        label='Review'
                        rules={[{ required: true, message: 'Please input your review!' }]}
                    >
                        <TextArea placeholder='Write your review' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='w-full'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
