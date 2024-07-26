import { IAxiosResponse } from '~/types/AxiosResponse';
import instance from '~/utils/api/axiosIntance';
import { REVIEW_ENDPOINT } from '~/constants/endpoint';
import { IReviewProductResponse } from '~/types/Review';

const reviewService = {
    async getReviewOfProduct(id: string) {
        const res = await instance.get<IAxiosResponse<IReviewProductResponse[]>>(
            `${REVIEW_ENDPOINT.GETOFPRODUCT}?productId=${id}`
        );
        return res.data;
    },
};

export default reviewService;
