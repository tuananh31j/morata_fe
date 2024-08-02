import { useMutation } from '@tanstack/react-query';
import productService from '~/services/product.service';

const useCreateProductVariant = () => {
    return useMutation({
        mutationFn: (data: FormData) => productService.createProductVariant(data),
        onSuccess: (res) => {
            console.log('Update product success', res);
        },
        onError(error) {
            console.log('Update product error', error);
        },
    });
};

export default useCreateProductVariant;
