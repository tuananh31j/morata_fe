import { IProductForm, IThumbnailAntd } from '~/types/Product';

type IHandleEditProductProp = {
    oldCategoryId: string;

    productId: string;
    data: IProductForm;
    variantRemoveIds: string[];
    updateProduct: ({ data, productId }: { data: FormData; productId: string }) => void;
    updateProductVariant: ({ data, variantId }: { data: FormData; variantId: string }) => void;
    createProductVariant: (data: FormData) => void;
};

export const handleEditProduct = async ({
    oldCategoryId,
    productId,
    data,
    variantRemoveIds,
    updateProduct,
    updateProductVariant,
    createProductVariant,
}: IHandleEditProductProp) => {
    const dataTransfer = new DataTransfer();
    const formDataUpdateProduct = new FormData();
    // const formDataUpdateProductVariant = new FormData();
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
    const firstElement = 0;

    /* eslint-disable */
    for (const [key, value] of Object.entries(attributes)) {
        attributesData.push({
            name: key.replace(/_/g, ' '),
            key,
            value,
        });
    }
    if (variations) {
        variations.map((value) => {
            if (value._id) {
                const formDataUpdateProductVariant = new FormData();
                if (value.thumbnail?.fileList?.[firstElement]?.originFileObj) {
                    formDataUpdateProductVariant.append(
                        'image',
                        value.thumbnail?.fileList?.[firstElement].originFileObj as File
                    );
                }
                delete value.thumbnail;
                const { imageUrlRef, price, stock, ...variantAttributesObj } = value;
                const variantAttributes = [];
                for (const [key, value] of Object.entries(variantAttributesObj.variantAttributes)) {
                    variantAttributes.push({
                        name: key.replace(/_/g, ' '),
                        key,
                        value,
                    });
                }
                const variantFinal = { imageUrlRef, price, stock, variantAttributes };
                formDataUpdateProductVariant.append('variantString', JSON.stringify(variantFinal));
                updateProductVariant({ data: formDataUpdateProductVariant, variantId: value._id });
            } else {
                const formDataCreateProductVariant = new FormData();
                if (value.thumbnail?.fileList?.[firstElement]?.originFileObj) {
                    formDataCreateProductVariant.append(
                        'image',
                        value.thumbnail?.fileList?.[firstElement].originFileObj as File
                    );
                }
                delete value.thumbnail;
                const { imageUrlRef, price, stock, ...variantAttributesObj } = value;
                const variantAttributes = [];
                if (variantAttributesObj.variantAttributes) {
                    for (const [key, value] of Object.entries(variantAttributesObj.variantAttributes)) {
                        variantAttributes.push({
                            name: key.replace(/_/g, ' '),
                            key,
                            value,
                        });
                    }
                }

                const variantFinal = { imageUrlRef, price, stock, variantAttributes };
                formDataCreateProductVariant.append('variantString', JSON.stringify(variantFinal));
                formDataCreateProductVariant.append('productId', productId);
                createProductVariant(formDataCreateProductVariant);
            }
        });
        /* eslint-enable */
        formDataUpdateProduct.append('name', name);
        formDataUpdateProduct.append('attributes', JSON.stringify(attributesData));
        const oldImages = [];
        const oldImagesRefs = [];

        /* eslint-disable */
        console.log(images, thumbnail?.file, '?????????????????????????????????????????????????????????????????');
        if (images?.fileList) {
            for (const file of images?.fileList) {
                if ((file as any).originFileObj) {
                    dataTransfer.items.add((file as any).originFileObj as File);
                    const firstImage = dataTransfer.files[firstElement];
                    console.log(firstImage, '00000000000000000');
                    formDataUpdateProduct.append('images', firstImage);
                    dataTransfer.items.clear();
                } else {
                    if ((file as any).status === 'done') {
                        console.log('ddddddddddddddddddddđxxxxxxxxxxxxxxxxxxxxxxxx');
                        oldImages.push((file as any).url as string);
                        oldImagesRefs.push((file as any).uid as string);
                    }
                }
            }
        }
        if (thumbnail?.file) {
            if ((thumbnail?.fileList[firstElement] as IThumbnailAntd).originFileObj) {
                formDataUpdateProduct.append(
                    'thumbnail',
                    (thumbnail?.fileList[firstElement] as IThumbnailAntd)?.originFileObj as File
                );
            }
        }
        formDataUpdateProduct.append('oldImages', JSON.stringify(oldImages));
        formDataUpdateProduct.append('oldImageRefs', JSON.stringify(oldImagesRefs));

        /* eslint-enable */
        formDataUpdateProduct.append('categoryId', categoryIdData);
        formDataUpdateProduct.append('brandId', brandIdData);

        formDataUpdateProduct.append('description', description || '');
        updateProduct({ data: formDataUpdateProduct, productId });
    }
};
