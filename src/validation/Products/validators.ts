import { IProductFiles, IProductVariation } from '~/types/Product';
import { errorMessage } from './Product';
import { ACCEPT_FILE_TYPE, MAX_SIZE } from '~/pages/Admins/_product_/Helper/_helper_';

/* eslint-disable */
export const imagesValidator = async (_: any, images: IProductFiles) => {
    if (images?.fileList?.length < 1 || !images) {
        return errorMessage('Please input your images!');
    }
    /* eslint-disable */
    if (images && images.fileList && images.fileList.length > 0) {
        for (const file of images?.fileList) {
            console.log(file, 'file');
            if (file?.size >= MAX_SIZE) {
                return errorMessage('Image size must be smaller than 5MB!');
            } else if (file?.type && !ACCEPT_FILE_TYPE.includes(file.type)) {
                console.log(file, 'fiêrrle');

                return errorMessage('Only accept png, jpg and jpeg type!');
            }
        }
    }
    return Promise.resolve();
};

export const thumbnailValidator = async (_: any, thumbnail: IProductFiles) => {
    //  (thumbnail.fileList[0] as any).originFileObj
    if (thumbnail && thumbnail.fileList && thumbnail.fileList.length > 0) {
        if (thumbnail?.fileList?.length < 1 || !thumbnail) {
            return errorMessage('Please input your thumbnail!');
        }
        if (thumbnail && thumbnail.file.size && thumbnail?.file.size >= MAX_SIZE) {
            return errorMessage('Image size must be smaller than 5MB!');
        }
        if (thumbnail?.file.type && !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)) {
            return errorMessage('Only accept png, jpg and jpeg type!');
        }
    }
    return Promise.resolve();
};

export const nameValidator = async (_: any, name: string) => {
    if (!name) {
        return errorMessage('Please input your name!');
    }
    if (name.length < 3) {
        return errorMessage('Name must be at least 3 characters long');
    }
    return Promise.resolve();
};
export const categoryValidator = () => {
    return { required: true, message: 'Please input your category!' };
};
export const brandValidator = () => {
    return { required: true, message: 'Please input your brand!' };
};

export const variationsValidator = async (_: any, variations: IProductVariation[]) => {
    if (!variations || variations.length < 1) {
        return errorMessage('Please input your variations!');
    }
    const variationEmpty = variations.some((variation) => variation === undefined);
    if (variationEmpty) {
        return errorMessage('Please input your variations!');
    }
    return Promise.resolve();
};
export const variationsThumbnailValidator = async (_: any, thumbnail: any) => {
    if (
        thumbnail &&
        thumbnail.fileList &&
        thumbnail.fileList.length > 0 &&
        (thumbnail.fileList[0] as any).originFileObj
    ) {
        if (thumbnail?.fileList?.length < 1 || !thumbnail) {
            return errorMessage('Please input your thumbnail!');
        }
        if (thumbnail && thumbnail.file.size && thumbnail.file.size >= MAX_SIZE) {
            return errorMessage('Image size must be smaller than 5MB!');
        }
        if (thumbnail?.file.type && !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)) {
            return errorMessage('Only accept png, jpg and jpeg type!');
        }
    }
    return Promise.resolve();
};
export const variationsColorValidator = () => {
    return { required: true, message: 'Please input your color!' };
};
export const variationsStorageValidator = () => {
    return { required: true, message: 'Please input your storage!' };
};
export const variationsPriceValidator = () => {
    return { required: true, message: 'Please input your price!' };
};
export const variationsStockValidator = () => {
    return { required: true, message: 'Please input your stock!' };
};
/* eslint-enable */
