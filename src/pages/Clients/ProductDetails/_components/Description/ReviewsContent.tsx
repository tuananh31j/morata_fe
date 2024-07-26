import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Modal, Rate } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetReviewOfProduct from '~/hooks/review/Queries/useGetReviewOfProduct';

const { TextArea } = Input;

export default function ReviewsContent({ TopReviews }: { TopReviews: number }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [contentSee, setContentSee] = useState<{ [index: number]: boolean }>({});
    const { id } = useParams();
    const { data } = useGetReviewOfProduct(id as string);
    const reviewContent = data?.data;
    const fiveRatinCount = reviewContent?.filter((item) => item.rating > 4);
    const fourRatingCount = reviewContent?.filter((item) => item.rating < 5 && item.rating > 3);
    const threeRatingCount = reviewContent?.filter((item) => item.rating < 4 && item.rating > 2);
    const twoRatingCount = reviewContent?.filter((item) => item.rating < 3 && item.rating > 1);
    const oneRatingCount = reviewContent?.filter((item) => item.rating < 2 && item.rating > 0);

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
                            <Rate allowHalf defaultValue={TopReviews} disabled={true} />
                            <span className='text-base font-medium  text-[#777777]'>
                                {TopReviews.toFixed(1)} out of 5
                            </span>
                        </div>
                        <p className='text-center text-base font-medium text-[#777777] lg:text-start'>
                            Base on {reviewContent?.length} reviews
                        </p>
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={5} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>
                                ( {fiveRatinCount?.length} Reviews)
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={4} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>
                                ( {fourRatingCount?.length} Reviews)
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={3} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>
                                ( {threeRatingCount?.length} Reviews)
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={2} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>
                                ( {twoRatingCount?.length} Reviews)
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Rate allowHalf className='text-[14px]' defaultValue={1} disabled={true} />
                            <span className='text-[14px] font-medium  text-[#777777]'>
                                ( {oneRatingCount?.length} Reviews)
                            </span>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleAddreview}
                            disabled={true}
                            className='flex h-[40px] w-[340px] items-center justify-center bg-[#ffb800] font-bold text-white'
                        >
                            Purchase required for review.
                        </button>
                    </div>
                </div>
                <div className='mx-4 mt-6 max-h-[70vh] overflow-y-scroll '>
                    {reviewContent &&
                        reviewContent.map((item, index) => (
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
                    {!reviewContent?.length && (
                        <>
                            <div className='flex h-[264px] items-center justify-center'>
                                <h3 className='text-center text-[#777777]'>
                                    The product has not received any reviews yet.
                                </h3>
                            </div>
                        </>
                    )}
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
