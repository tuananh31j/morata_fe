import { MAIN_ROUTES } from '~/constants/router';

export const generateLink = ({ productId, categoryId }: { productId: string; categoryId: string }) => {
    return `${MAIN_ROUTES.PRODUCTS}/${productId}?categoryId=${categoryId}`;
};
