import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetProfile from '~/hooks/profile/Queries/useGetProfile';
import useCreateReview from '~/hooks/review/Mutations/useCreateReview';
import useUpdateReview from '~/hooks/review/Mutations/useUpdateReview';
import useGetReviewOfProduct from '~/hooks/review/Queries/useGetReviewOfProduct';
import { useTypedSelector } from '~/store/store';
import { IReviewProductResponse } from '~/types/Review';
import showMessage from '~/utils/ShowMessage';
import ReviewModal from '../ReviewModal/ReviewModal';
import dayjs from 'dayjs';

type ReviewData = {
    content: string;
    rating: number;
    reviewId?: string;
};

export default function ReviewsContent({ TopReviews }: { TopReviews: number }) {
    const { id } = useParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [contentSee, setContentSee] = useState<{ [index: number]: boolean }>({});
    const { data } = useGetReviewOfProduct(id as string);
    const { data: userInfo } = useGetProfile();
    const userInfoData = userInfo?.data;
    const orderIdStorage = window.localStorage.getItem('orderId') || '';
    const orderId = useTypedSelector((state) => state.rateProductSlice.orderId) || orderIdStorage;
    const isOpen = useTypedSelector((state) => state.rateProductSlice.isOpen);

    const {
        mutate: createReview,
        isSuccess: isCreateReviewSuccess,
        isPending: isCreateReviewPending,
    } = useCreateReview();
    const {
        mutate: updateReview,
        isSuccess: isUpdateReviewSuccess,
        isPending: isUpdateReviewPending,
    } = useUpdateReview();

    const reviewContent = data?.data;
    const [initialReview, setInitialReview] = useState<IReviewProductResponse>({
        rating: 0,
        content: '',
        userId: { _id: '', username: '', avatar: '' },
        updatedAt: '',
        createdAt: '',
        productId: '',
        _id: '',
    });

    const fiveRatingCount = reviewContent?.filter((item) => item.rating > 4);
    const fourRatingCount = reviewContent?.filter((item) => item.rating < 5 && item.rating > 3);
    const threeRatingCount = reviewContent?.filter((item) => item.rating < 4 && item.rating > 2);
    const twoRatingCount = reviewContent?.filter((item) => item.rating < 3 && item.rating > 1);
    const oneRatingCount = reviewContent?.filter((item) => item.rating < 2 && item.rating > 0);

    const handleEditReview = (reviewData: IReviewProductResponse) => {
        setInitialReview(reviewData);
        setIsModalVisible(true);
    };

    const dropdownItems = (reviewData: IReviewProductResponse, index: number): MenuProps['items'] => {
        return [
            {
                key: index,
                label:
                    reviewData.userId._id === userInfoData?._id ? (
                        <span onClick={() => handleEditReview(reviewData)}>Chỉnh sửa</span>
                    ) : (
                        <span>Báo cáo</span>
                    ),
            },
        ];
    };

    const handleAddreview = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleSubmit = (Reviewdata: ReviewData) => {
        if (Reviewdata.reviewId) {
            updateReview({
                rating: Reviewdata.rating,
                content: Reviewdata.content,
                _id: Reviewdata.reviewId,
            });
        } else {
            createReview({
                rating: Reviewdata.rating,
                content: Reviewdata.content,
                userId: userInfo?.data._id as string,
                productId: id as string,
                orderId: orderId as string,
            });
        }
    };

    const toggleSeeMore = (index: number) => {
        setContentSee({ ...contentSee, [index]: !contentSee[index] });
    };

    useEffect(() => {
        if (isCreateReviewSuccess) {
            showMessage('Review successfully', 'success');
            setIsModalVisible(false);
        }
        if (isUpdateReviewSuccess) {
            showMessage('Edit review successfully', 'success');
            setIsModalVisible(false);
        }
    }, [isCreateReviewSuccess, isUpdateReviewSuccess]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsModalVisible(true);
            }, 100);
        }
    }, [isOpen]);

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
                                ( {fiveRatingCount?.length} Reviews)
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
                            disabled={orderId ? false : true}
                            className='flex h-[40px] w-[340px] items-center justify-center bg-[#ffb800] font-bold text-white'
                        >
                            {orderId ? ' Write a review' : ' Purchase required for review'}
                        </button>
                    </div>
                </div>
                <div className='mx-4 mt-6 max-h-[70vh] overflow-y-scroll py-6 '>
                    {reviewContent &&
                        reviewContent.map((item, index) => (
                            <div key={index} className='mb-6 flex flex-col gap-2 py-2'>
                                <Rate defaultValue={item.rating} disabled className='text-[16px]' />
                                <div>
                                    <div className='flex items-center justify-between gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <Avatar
                                                shape='square'
                                                size={32}
                                                src={item?.userId.avatar}
                                                alt='avatar'
                                                icon={<UserOutlined className='text-yellow-500' />}
                                            />
                                            <span className='text-[14px] text-yellow-500'>{item.userId.username}</span>
                                            <Dropdown menu={{ items: dropdownItems(item, index) }} trigger={['click']}>
                                                <MoreOutlined className='cursor-pointer' />
                                            </Dropdown>
                                        </div>
                                        <div className='mx-3 text-xs opacity-80'>
                                            <span>{dayjs(item.createdAt).format('DD/MM/YYYY')}</span>
                                        </div>
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
            <ReviewModal
                initialValue={initialReview}
                isModalVisible={isModalVisible}
                isSuccessful={isCreateReviewPending || isUpdateReviewPending}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
            ></ReviewModal>
        </>
    );
}
