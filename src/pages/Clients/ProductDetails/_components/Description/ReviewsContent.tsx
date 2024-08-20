import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Rate } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetProfile from '~/hooks/profile/Queries/useGetProfile';
import useCreateReview from '~/hooks/review/Mutations/useCreateReview';
import useUpdateReview from '~/hooks/review/Mutations/useUpdateReview';
import useGetReviewOfProduct from '~/hooks/review/Queries/useGetReviewOfProduct';
import { useTypedSelector } from '~/store/store';
import { IReviewProductResponse, ReportData } from '~/types/Review';
import ReviewModal from '../ReviewModal/ReviewModal';
import ReportModal from '../ReportModal/ReportModal';
import useCreateReport from '~/hooks/review/Mutations/useCreateReport';

type ReviewData = {
    content: string;
    rating: number;
    reviewId?: string;
};

type userReviewData = { reviewId: string; userId: string; content: string };

export default function ReviewsContent({ TopReviews }: { TopReviews: number }) {
    const { id } = useParams();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);
    const [contentSee, setContentSee] = useState<{ [index: number]: boolean }>({});
    const { data } = useGetReviewOfProduct(id as string);
    const { data: userInfo } = useGetProfile();
    const userInfoData = userInfo?.data;
    const orderIdStorage = window.localStorage.getItem('orderId') || '';
    const orderId = useTypedSelector((state) => state.rateProductSlice.orderId) || orderIdStorage;
    const isOpen = useTypedSelector((state) => state.rateProductSlice.isOpen);
    const userReviewData = useRef<userReviewData>({ reviewId: '', userId: '', content: '' });
    const {
        mutate: createReview,
        isSuccess: isCreateReviewSuccess,
        isPending: isCreateReviewPending,
    } = useCreateReview();
    const {
        mutate: createReport,
        isSuccess: isCreateReportSuccess,
        isPending: isCreateReportPending,
    } = useCreateReport();
    const {
        mutate: updateReview,
        isSuccess: isUpdateReviewSuccess,
        isPending: isUpdateReviewPending,
    } = useUpdateReview();

    const reviewContent = data?.data;
    const [initialReview, setInitialReview] = useState<IReviewProductResponse>({
        rating: 0,
        content: '',
        userId: { _id: '', name: '', avatar: '' },
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

    // Dropdown review Items
    const dropdownItems = (reviewData: IReviewProductResponse, index: number): MenuProps['items'] => {
        return [
            {
                key: index,
                label:
                    reviewData.userId._id === userInfoData?._id ? (
                        <span className='p-2' onClick={() => handleEditReview(reviewData)}>
                            Chỉnh sửa
                        </span>
                    ) : (
                        <span
                            className='p-2'
                            onClick={() =>
                                handleAddReport({
                                    userId: reviewData.userId._id,
                                    reviewId: reviewData._id,
                                    content: reviewData.content,
                                })
                            }
                        >
                            Báo cáo
                        </span>
                    ),
            },
        ];
    };

    // @handle modal

    // review
    const handleEditReview = (reviewData: IReviewProductResponse) => {
        setInitialReview(reviewData);
        setIsModalVisible(true);
    };

    const handleAddReview = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        document.body.classList.remove('noscroll');
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

    // report
    const handleAddReport = (reviewData: userReviewData) => {
        setIsReportModalVisible(true);
        userReviewData.current = reviewData;
    };

    const handleCancelReport = () => {
        setIsReportModalVisible(false);
    };
    const handleReport = (reportData: ReportData) => {
        const reasonContent = reportData.reason === 'other' ? (reportData.content as string) : reportData.reason;
        createReport({
            reason: reasonContent,
            reporterId: userInfoData?._id as string,
            reviewId: userReviewData.current.reviewId,
            userId: userReviewData.current.userId,
            content: userReviewData.current.content,
        });
    };

    const toggleSeeMore = (index: number) => {
        setContentSee({ ...contentSee, [index]: !contentSee[index] });
    };

    useEffect(() => {
        if (isCreateReviewSuccess) {
            setIsModalVisible(false);
        }
        if (isUpdateReviewSuccess) {
            setIsModalVisible(false);
        }
        if (isCreateReportSuccess) {
            setIsReportModalVisible(false);
        }
    }, [isCreateReviewSuccess, isUpdateReviewSuccess, isCreateReportSuccess]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsModalVisible(true);
            }, 100);
        }
    }, [isOpen]);

    return (
        <>
            <h3 className='my-6 text-center text-xl'>Đánh giá của khách hàng</h3>
            <div>
                <div className='mx-auto flex max-w-[1280px] flex-col items-center gap-4 lg:flex-row lg:justify-between'>
                    <div>
                        <div className='flex gap-2'>
                            <Rate allowHalf value={TopReviews} disabled={true} />
                            <span className='text-base font-medium  text-[#777777]'>{TopReviews.toFixed(1)}</span>
                        </div>
                        <p className='text-center text-base font-medium text-[#777777] lg:text-start'>
                            Dựa trên {reviewContent?.length} đánh giá
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
                            onClick={handleAddReview}
                            disabled={orderId ? false : true}
                            className='flex h-[40px] w-[340px] items-center justify-center bg-[#ffb800] font-bold text-white'
                        >
                            {orderId ? 'Viết đánh giá' : 'Bạn cần mua hàng để đánh giá'}
                        </button>
                    </div>
                </div>
                <div className='mx-4 mt-6 max-h-[70vh] overflow-y-scroll py-6 '>
                    {reviewContent &&
                        reviewContent.map((item, index) => (
                            <div key={index} className='mb-6 flex flex-col gap-2 py-2'>
                                <Rate value={item.rating} disabled className='text-[16px]' />
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
                                            <span className='text-[14px] text-yellow-500'>{item.userId.name}</span>
                                            <Dropdown menu={{ items: dropdownItems(item, index) }} trigger={['click']}>
                                                <MoreOutlined className='cursor-pointer' />
                                            </Dropdown>
                                        </div>
                                        <div className='mx-3 text-xs opacity-80'>
                                            <span className=''>{dayjs(item.createdAt).format('DD/MM/YYYY')}</span>
                                        </div>
                                    </div>
                                    <div className='no-scrollbar mt-2 overflow-y-scroll'>
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
                                                Xem thêm
                                            </button>
                                        )}
                                        {contentSee[index] && (
                                            <button
                                                onClick={() => toggleSeeMore(index)}
                                                className='text-[14px] text-cyan-500 hover:underline'
                                            >
                                                Rút gọn
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    {!reviewContent?.length && (
                        <>
                            <div className='flex h-[264px] items-center justify-center'>
                                <h3 className='text-center text-[#777777]'>Sản phẩm chưa nhận được đánh giá nào.</h3>
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

            <ReportModal
                isModalVisible={isReportModalVisible}
                isSuccessful={isCreateReportPending}
                handleCancel={handleCancelReport}
                handleSubmit={handleReport}
            ></ReportModal>
        </>
    );
}
