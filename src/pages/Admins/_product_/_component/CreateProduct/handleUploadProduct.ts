import { IProductForm, IThumbnailAntd } from '~/types/Product';

export const handleCreateProduct = (data: IProductForm, createProduct: (product: FormData) => void) => {
    const dataTransfer = new DataTransfer();
    const formData = new FormData();
    const {
        name,
        images,
        thumbnail,
        description,
        variations,
        attributes,
        brandId: brandIdData,
        categoryId: categoryIdData,
    } = data;
    const attributesData = [];
    const newVariations = [];
    const firstElement = 0;

    /* eslint-disable */
    for (const [key, value] of Object.entries(attributes)) {
        attributesData.push({
            key,
            value,
        });
    }
    if (variations) {
        for (const [, value] of Object.entries(variations)) {
            // value.thumbnail?.fileList.forEach((file) => {
            //     Object.assign(file, { name: `${file.name}` });
            // });
            formData.append('variationImages', value.thumbnail?.fileList?.[firstElement].originFileObj as File);
            Object.assign(value, {
                imageUrlRef: value.thumbnail?.fileList[firstElement].name,
            });

            // Delete thumbnail
            const { thumbnail, ...rest } = value;
            newVariations.push(rest);
        }
    }
    /* eslint-enable */
    formData.append('name', name);
    formData.append('attributes', JSON.stringify(attributesData));
    formData.append('variationsString', JSON.stringify(newVariations));

    /* eslint-disable */
    if (images?.fileList && thumbnail?.file) {
        for (const file of images?.fileList) {
            dataTransfer.items.add((file as any).originFileObj as File);
            const firstImage = dataTransfer.files[firstElement];
            formData.append('images', firstImage);
            dataTransfer.items.clear();
        }
        formData.append('thumbnail', (thumbnail?.fileList[firstElement] as IThumbnailAntd)?.originFileObj as File);
    }
    /* eslint-enable */
    formData.append('categoryId', categoryIdData);
    formData.append('brandId', brandIdData);

    formData.append('description', description || '');

    // Mutation to create product
    createProduct(formData);
};
