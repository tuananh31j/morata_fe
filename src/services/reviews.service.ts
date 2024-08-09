import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';
import { REVIEW_ENDPOINT } from '~/constants/endpoint';
import { ICountReview, IReviewProductResponse, IReviewResponse, ReviewData } from '~/types/Review';

const reviewService = {
    async getReviewOfProduct(id: string) {
        const res = await instance.get<IAxiosResponse<IReviewProductResponse[]>>(
            `${REVIEW_ENDPOINT.GETOFPRODUCT}?productId=${id}`
        );
        return res.data;
    },
    async getDetailReview(id: string) {
        const res = await instance.get<IAxiosResponse<IReviewResponse>>(`${REVIEW_ENDPOINT.GET_DETAIL}/${id}`);
        return res.data;
    },
    async createReview(data: ReviewData) {
        const res = await instance.post<IAxiosResponse<IReviewProductResponse>>(`${REVIEW_ENDPOINT.CREATE}`, data);
        return res.data;
    },
    async updateReview(data: ReviewData) {
        const res = await instance.patch<IAxiosResponse<IReviewResponse>>(
            `${REVIEW_ENDPOINT.CREATE}/${data._id}`,
            data
        );
        return res.data;
    },
};

export default reviewService;
