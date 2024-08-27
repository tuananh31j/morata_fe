import { IProductForm, IThumbnailAntd } from '~/types/Product';
import convertData from './convertData';
import { DataTypeConvert } from '~/constants/enum';
import { IAttributesValue } from '~/types/Attributes';

export const handleCreateProduct = (
    data: IProductForm,
    createProduct: (product: FormData) => void,
    attributeSource: IAttributesValue[]
) => {
    const dataTransfer = new DataTransfer();
    const formData = new FormData();
    const {
        name,
        images,
        thumbnail,
        description,
        variations,
        attributes,
        isHide,
        brandId: brandIdData,
        categoryId: categoryIdData,
    } = data;
    const newVariations = [];
    const firstElement = 0;

    /* eslint-disable */
    const attributesData = convertData({ data: attributes, to: DataTypeConvert.raw, attributeSource });
    if (variations) {
        for (const [, value] of Object.entries(variations)) {
            if (value.thumbnail?.fileList?.[firstElement]?.originFileObj) {
                formData.append('variationImages', value.thumbnail?.fileList?.[firstElement].originFileObj as File);
                Object.assign(value, {
                    imageUrlRef: value.thumbnail?.fileList[firstElement].name,
                });
                // Delete thumbnail
                const { thumbnail, ...rest } = value;
                const { imageUrlRef, price, stock, isActive, ...variantAttributesObj } = rest;
                const variantAttributes = variantAttributesObj.variantAttributes
                    ? convertData({
                          data: variantAttributesObj.variantAttributes,
                          to: DataTypeConvert.raw,
                          attributeSource,
                      })
                    : [];
                const variantFinal = { imageUrlRef, price, stock, isActive, variantAttributes };
                newVariations.push(variantFinal);
            }
        }
    }
    /* eslint-enable */
    formData.append('name', name);
    formData.append('isHide', String(isHide));
    formData.append('attributes', JSON.stringify(attributesData));
    formData.append('variationsString', JSON.stringify(newVariations));

    /* eslint-disable */
    if (images?.fileList && thumbnail?.file) {
        for (const file of images?.fileList) {
            if ((file as any).originFileObj) {
                dataTransfer.items.add((file as any).originFileObj as File);
                const firstImage = dataTransfer.files[firstElement];
                formData.append('images', firstImage);
                dataTransfer.items.clear();
            }
        }
        if ((thumbnail?.fileList[firstElement] as IThumbnailAntd).originFileObj) {
            formData.append('thumbnail', (thumbnail?.fileList[firstElement] as IThumbnailAntd)?.originFileObj as File);
        }
    }
    /* eslint-enable */
    formData.append('categoryId', categoryIdData);
    formData.append('brandId', brandIdData);

    formData.append('description', description || '');
    console.log(formData);
    // Mutation to create product
    createProduct(formData);
};
