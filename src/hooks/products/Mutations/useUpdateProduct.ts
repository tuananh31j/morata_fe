import { useMutation } from '@tanstack/react-query';
import productService from '~/services/product.service';

const useUpdateProduct = (id: string) => {
    return useMutation({
        mutationFn: (data: FormData) => productService.updateProduct(data, id),
        onSuccess: (res) => {
            console.log('Update product success', res);
        },
        onError(error) {
            console.log('Update product error', error);
        },
    });
};

export default useUpdateProduct;
