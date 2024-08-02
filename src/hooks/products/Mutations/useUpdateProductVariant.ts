import { useMutation } from '@tanstack/react-query';
import productService from '~/services/product.service';

const useUpdateProductVariant = () => {
    return useMutation({
        mutationFn: ({ data, variantId }: { data: FormData; variantId: string }) =>
            productService.updateProductVariant(data, variantId),
        onSuccess: (res) => {
            console.log('Update product variant success', res);
        },
        onError(error) {
            console.log('Update product variant error', error);
        },
    });
};

export default useUpdateProductVariant;
