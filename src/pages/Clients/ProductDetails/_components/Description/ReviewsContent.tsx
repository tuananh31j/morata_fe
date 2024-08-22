import { MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Rate, Select, Skeleton } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import StaticImages from '~/assets';
import { ReportReason } from '~/constants/enum';
import useGetProfile from '~/hooks/profile/Queries/useGetProfile';
import useCreateReport from '~/hooks/review/Mutations/useCreateReport';
import useCreateReview from '~/hooks/review/Mutations/useCreateReview';
import useUpdateReview from '~/hooks/review/Mutations/useUpdateReview';
import useGetReviewOfProduct from '~/hooks/review/Queries/useGetReviewOfProduct';
import useGetStarsReview from '~/hooks/review/Queries/useGetStarsReview';
import { useTypedSelector } from '~/store/store';
import { IReviewProductResponse, ReportData } from '~/types/Review';
import ReportModal from '../ReportModal/ReportModal';
import ReviewModal from '../ReviewModal/ReviewModal';

type ReviewData = {
    content: string;
    rating: number;
    reviewId?: string;
};

export type ReviewParams = {
    rating?: number | string;
    limit?: number | string;
    sort?: string;
};

type userReviewData = {
    reviewId: string;
    userId: string;
    content: string;
};

export default function ReviewsContent({ TopReviews }: { TopReviews: number }) {
    const { id } = useParams();
    const limit = 10;
    const [query, setQuery] = useState<ReviewParams>({ rating: '', limit, sort: '-createdAt' });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);
    const [contentSee, setContentSee] = useState<{ [index: number]: boolean }>({});
    const { data, isLoading } = useGetReviewOfProduct(id as string, query);
    const reviewContent = data?.data;
    const { data: reviewContentRes } = useGetStarsReview(id as string);
    const reviewCount = reviewContentRes?.data;
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

    const [initialReview, setInitialReview] = useState<IReviewProductResponse>({
        rating: 0,
        content: '',
        userId: { _id: '', name: '', avatar: '' },
        updatedAt: '',
        createdAt: '',
        productId: '',
        _id: '',
    });
    const sortOptions = [
        { value: '-createdAt', label: 'Mới nhất' },
        { value: 'createdAt', label: 'Cũ nhất' },
        { value: '-rating', label: 'Cao nhất' },
        { value: 'rating', label: 'Thấp nhất' },
    ];
    const limitRes = reviewContent?.limit as number;
    const totalDocsRes = reviewContent?.totalDocs as number;

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
                userId: userInfo?.data.data._id as string,
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
        const reasonContent =
            reportData.reason === ReportReason.Other ? (reportData.content as string) : reportData.reason;
        createReport({
            reason: reasonContent,
            reviewId: userReviewData.current.reviewId,
            userId: userReviewData.current.userId,
            content: userReviewData.current.content,
        });
    };

    const toggleSeeMore = (index: number) => {
        setContentSee({ ...contentSee, [index]: !contentSee[index] });
    };

    const handleFilter = (params: ReviewParams) => {
        if (params.rating === query.rating && query.rating) return;
        setQuery({ ...query, ...params });
    };
    const handleChangeSort = (sort: string) => {
        handleFilter({ sort });
    };

    // Dropdown review Items
    const dropdownItems = (reviewData: IReviewProductResponse, index: number): MenuProps['items'] => {
        return [
            {
                key: index,
                label:
                    reviewData.userId._id === userInfoData?.data._id ? (
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

    const handleResetFilter = () => {
        handleFilter({ rating: '', limit });
    };

    const handleViewMore = () => {
        handleFilter({
            limit:
                (query?.limit as number) + limitRes >= totalDocsRes
                    ? reviewContent?.totalDocs.toString()
                    : ((query?.limit as number) + limitRes).toString(),
        });
    };
    const handleSelectStar = (star: number) => {
        handleFilter({ rating: star.toString(), limit });
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
                            Dựa trên {reviewCount?.countReview} đánh giá
                        </p>
                    </div>
                    <div>
                        {reviewCount?.starsReview.map((item, index) => (
                            <div key={index}>
                                <div className='flex cursor-pointer items-center gap-2'>
                                    <span className='cursor-pointer'>
                                        <Rate
                                            allowHalf
                                            className='text-[14px]'
                                            defaultValue={item.star}
                                            disabled={true}
                                        />
                                    </span>
                                    <div
                                        className='flex items-center gap-2 transition-opacity duration-300 hover:opacity-60'
                                        onClick={() => handleSelectStar(item.star)}
                                    >
                                        <span className='inline-block h-[0.625rem] w-34 bg-yellow-400'></span>
                                        <span className='text-[14px] font-medium  text-[#777777]'>
                                            ( {item.count} Đánh giá )
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {query.rating && (
                            <span
                                onClick={handleResetFilter}
                                className='mt-2 block cursor-pointer p-2 text-center text-sm text-yellow-400 transition duration-300 hover:underline'
                            >
                                Xem tất cả đánh giá
                            </span>
                        )}
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

                {/* Sort options */}
                <div className='mt-4'>
                    <Select
                        defaultValue={sortOptions?.[0].value}
                        onChange={handleChangeSort}
                        options={sortOptions}
                        className='w-[160px]'
                    />
                </div>
                <div className='review__scrollbar mx-4 mt-6 max-h-[70vh] overflow-y-scroll py-6 pr-4 '>
                    {reviewContent &&
                        reviewContent.reviewList?.map((item, index) => (
                            <div key={index} className='mb-6 flex flex-col gap-2 py-2'>
                                <Rate value={item.rating} disabled className='text-base' />
                                <div>
                                    <div className='flex items-center justify-between gap-2'>
                                        <div className='flex items-center gap-2'>
                                            <Avatar
                                                shape='square'
                                                size={32}
                                                src={item?.userId.avatar || StaticImages.userImageDf}
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
                                            className={`mr-4 rounded-sm bg-neutral-50 p-2 text-base font-medium text-black ${contentSee[index] ? '' : 'line-clamp-2'}`}
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

                    {isLoading && <Skeleton avatar active paragraph={{ rows: 3 }} />}
                    {!reviewContent?.reviewList.length && !isLoading && (
                        <>
                            <div className='flex h-[264px] items-center justify-center'>
                                <h3 className='text-center text-[#777777]'>Sản phẩm chưa nhận được đánh giá nào.</h3>
                            </div>
                        </>
                    )}
                </div>

                {/* View more */}
                {totalDocsRes > (query?.limit as number) && (
                    <span
                        onClick={handleViewMore}
                        className='my-4 block cursor-pointer text-center text-sm font-semibold text-yellow-400 transition duration-300 hover:underline'
                    >
                        Xem thêm
                    </span>
                )}
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
