import { DollarOutlined, PlusOutlined, PlusSquareOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    FormProps,
    GetProp,
    Image,
    Input,
    InputNumber,
    Select,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';
import { useEffect, useId, useState } from 'react';
import useCreateProduct from '~/hooks/Mutations/Product/useCreateProduct';
import useGetCategoriesAndBrands from '~/hooks/Queries/useGetCategoriesAndBrands';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IProductForm } from '~/types/Product';
import { errorMessage } from '~/validation/Product';

const ACCEPT_FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];
const MAX_SIZE = 5000000;

// const onFinishFailed: FormProps<IProductForm>['onFinishFailed'] = (errorInfo) => {
//     console.log('Failed:', errorInfo);
// };
// const handleChangeCat = (value: string) => {
//     console.log(`selected ${value}`);
// };
// const handleChangeBrand = (value: string) => {
//     console.log(`selected ${value}`);
// };

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const CreateProduct = () => {
    const [previewImagesOpen, setPreviewImagesOpen] = useState<boolean>(false);
    const [previewImages, setPreviewImages] = useState<string>('');
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
    const [imagesfileList, setImagesFileList] = useState<UploadFile[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const categoriesAndBranData = useGetCategoriesAndBrands();
    const { mutate: createProduct, data: createProductData, isError, error } = useCreateProduct();
    const sku = useId();
    const [form] = Form.useForm();
    const dataIndex = {
        brands: 0,
        categories: 1,
    };
    const firstElement = 0;
    const categories = categoriesAndBranData?.[dataIndex.categories].data?.data;
    // get initial value for categorys
    const initialCategory = {
        label: categories?.[firstElement].name,
        value: categories?.[firstElement]._id,
    };
    const brands = categoriesAndBranData?.[dataIndex.brands].data?.data;
    // get initial value for  brand
    const initialBrand = {
        label: brands?.[firstElement].name,
        value: brands?.[firstElement]._id,
    };
    const handlePreview = async (file: UploadFile, multiple: boolean) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        if (multiple) {
            setPreviewImages(file.url || (file.preview as string));
            setPreviewImagesOpen(true);
        } else {
            setPreviewThumbnail(file.url || (file.preview as string));
            setPreviewThumbnailOpen(true);
        }
    };

    const handleChangeImages: UploadProps['onChange'] = ({ fileList: newFileList }) => setImagesFileList(newFileList);
    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);
    const handleCreateProduct = (data: IProductForm) => {
        const { name, price, stock, images, thumbnail, description, brandId, categoryId } = data;
        const formData = new FormData();
        const dataTransfer = new DataTransfer();

        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('stock', stock.toString());

        /* eslint-disable */
        if (images?.fileList && thumbnail?.file) {
            for (const file of images?.fileList) {
                dataTransfer.items.add((file as any).originFileObj as FileType);
                const firstImage = dataTransfer.files[0];
                formData.append('images', firstImage);
                dataTransfer.items.clear();
            }
            formData.append('thumbnail', thumbnail?.file);
        }
        /* eslint-enable */
        formData.append('categoryId', typeof categoryId === 'object' ? categoryId.value : categoryId);
        formData.append('brandId', typeof brandId === 'object' ? brandId.value : brandId);
        formData.append('description', description);
        formData.append('sku', sku.toString());
        // Mutation to create product
        createProduct(formData);
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const onFinish: FormProps<IProductForm>['onFinish'] = (values) => {
        handleCreateProduct(values);
    };

    useEffect(() => {
        if (isError) {
            const errorMessageRes = ((error as AxiosError)?.response?.data as IAxiosResponse<null>)?.message?.split(
                '"'
            );
            const keyIndex = 1;
            const messageIndex = 2;
            form.setFields([
                {
                    name: [errorMessageRes[keyIndex]],
                    errors: [errorMessageRes[messageIndex]],
                },
            ]);
        }
    }, [createProductData, isError, error, form]);
    return (
        <>
            {!categoriesAndBranData?.[dataIndex.categories].isLoading &&
                !categoriesAndBranData?.[dataIndex.brands].isLoading && (
                    <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                        <div className='m-auto'>
                            <Form
                                layout='vertical'
                                form={form}
                                onFinish={onFinish}
                                // onFinishFailed={onFinishFailed}
                                autoComplete='off'
                            >
                                <div className='grid grid-cols-2 gap-2'>
                                    <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                                        <h3 className='my-2 text-lg font-medium text-[#08090F]'>General information</h3>
                                        <Form.Item<IProductForm>
                                            label='Product Name'
                                            name='name'
                                            className='font-medium text-[#08090F]'
                                            rules={[
                                                {
                                                    validator: async (_, name) => {
                                                        if (!name) {
                                                            return errorMessage('Please input your name!');
                                                        }
                                                        if (name.length < 3) {
                                                            return errorMessage(
                                                                'Name must be at least 3 characters long'
                                                            );
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                },
                                            ]}
                                        >
                                            <Input size='large' />
                                        </Form.Item>
                                        <Form.Item<IProductForm>
                                            label='Product Description'
                                            name='description'
                                            className='font-medium text-[#08090F]'
                                        >
                                            <TextArea rows={4} className='w-full' />
                                        </Form.Item>
                                    </div>
                                    <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                                        <h3 className='my-2 text-lg font-medium text-[#08090F]'>Pricing</h3>
                                        <Form.Item<IProductForm>
                                            className='font-medium text-[#08090F]'
                                            label='Product Price'
                                            name='price'
                                            rules={[
                                                {
                                                    validator: async (_, price) => {
                                                        const oneHundredThousand = 100000;
                                                        if (!price) {
                                                            return errorMessage('Please input your price!');
                                                        }
                                                        if (price < 0) {
                                                            return errorMessage('Price must be larger than zero!');
                                                        }
                                                        if (price >= oneHundredThousand) {
                                                            return errorMessage(
                                                                'Price must be smaller than one hundred thousand!'
                                                            );
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                },
                                            ]}
                                        >
                                            <InputNumber prefix={<DollarOutlined />} size='large' className='w-full' />
                                        </Form.Item>

                                        <Form.Item<IProductForm>
                                            className='font-medium text-[#08090F]'
                                            label='Product Discount'
                                            name='discountPercentage'
                                            rules={[{ required: true, message: 'Please input your discount!' }]}
                                        >
                                            <InputNumber size='large' max={100} min={0} className='w-full' />
                                        </Form.Item>
                                    </div>
                                    <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                                        <h3 className='my-2 text-lg font-medium text-[#08090F]'>Product Media</h3>
                                        <Form.Item<IProductForm>
                                            label='Product Images'
                                            name='images'
                                            className='font-medium text-[#08090F]'
                                            rules={[
                                                {
                                                    validator: async (_, images) => {
                                                        if (!images) {
                                                            return errorMessage('Please input your images!');
                                                        }
                                                        /* eslint-disable */
                                                        for (const file of images?.fileList) {
                                                            if (file?.size >= MAX_SIZE) {
                                                                return errorMessage(
                                                                    'Image size must be smaller than 5MB!'
                                                                );
                                                            } else if (
                                                                file?.type &&
                                                                !ACCEPT_FILE_TYPE.includes(images?.file.type)
                                                            ) {
                                                                return errorMessage(
                                                                    'Only accept png, jpg and jpeg type!'
                                                                );
                                                            }
                                                        }
                                                        /* eslint-enable */
                                                        return Promise.resolve();
                                                    },
                                                },
                                            ]}
                                        >
                                            <Upload
                                                beforeUpload={() => false}
                                                listType='picture-card'
                                                fileList={imagesfileList}
                                                onPreview={(files) => handlePreview(files, true)}
                                                onChange={handleChangeImages}
                                                maxCount={5}
                                                multiple
                                            >
                                                {imagesfileList.length >= 5 ? null : uploadButton}
                                            </Upload>
                                        </Form.Item>
                                        {previewImages && (
                                            <Image
                                                wrapperStyle={{ display: 'none' }}
                                                preview={{
                                                    visible: previewImagesOpen,
                                                    onVisibleChange: (visible) => setPreviewImagesOpen(visible),
                                                    afterOpenChange: (visible) => !visible && setPreviewImages(''),
                                                }}
                                                src={previewImages}
                                            />
                                        )}
                                        <Form.Item<IProductForm>
                                            label='Product Thumbnail'
                                            name='thumbnail'
                                            className='font-medium text-[#08090F]'
                                            rules={[
                                                {
                                                    validator: async (_, thumbnail) => {
                                                        if (!thumbnail) {
                                                            return errorMessage('Please input your thumbnail!');
                                                        }
                                                        if (thumbnail?.file.size >= MAX_SIZE) {
                                                            return errorMessage('Image size must be smaller than 5MB!');
                                                        }
                                                        if (
                                                            thumbnail?.file.type &&
                                                            !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)
                                                        ) {
                                                            return errorMessage('Only accept png, jpg and jpeg type!');
                                                        }
                                                        return Promise.resolve();
                                                    },
                                                },
                                            ]}
                                        >
                                            <Upload
                                                beforeUpload={() => false}
                                                listType='picture-card'
                                                fileList={thumbnailFile}
                                                onPreview={(file) => handlePreview(file, false)}
                                                onChange={handleChangeThumbnail}
                                                maxCount={1}
                                            >
                                                {thumbnailFile.length >= 1 ? null : uploadButton}
                                            </Upload>
                                        </Form.Item>
                                        {previewThumbnail && (
                                            <Image
                                                wrapperStyle={{ display: 'none' }}
                                                preview={{
                                                    visible: previewThumbnailOpen,
                                                    onVisibleChange: (visible) => setPreviewThumbnailOpen(visible),
                                                    afterOpenChange: (visible) => !visible && setPreviewThumbnail(''),
                                                }}
                                                src={previewThumbnail}
                                            />
                                        )}
                                        <Form.Item className='flex justify-end'>
                                            <Button
                                                type='primary'
                                                htmlType='submit'
                                                icon={<PlusSquareOutlined />}
                                                className='mr-3 px-5'
                                                size='large'
                                            >
                                                Add product
                                            </Button>
                                            <Button
                                                type='default'
                                                htmlType='button'
                                                icon={<VerticalAlignBottomOutlined />}
                                                className='px-5'
                                                size='large'
                                            >
                                                Import
                                            </Button>
                                        </Form.Item>
                                    </div>
                                    <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                                        <h3 className='my-2 text-lg font-medium text-[#08090F]'>Tags</h3>
                                        <Form.Item<IProductForm>
                                            label='Product Category'
                                            name='categoryId'
                                            initialValue={initialCategory}
                                            className='font-medium text-[#08090F]'
                                            rules={[{ required: true, message: 'Please input your category!' }]}
                                        >
                                            <Select
                                                size='large'
                                                // onChange={handleChangeCat}
                                                className='w-full'
                                                options={categories?.map((category) => ({
                                                    label: category.name,
                                                    value: category._id,
                                                }))}
                                            />
                                        </Form.Item>
                                        <Form.Item<IProductForm>
                                            label='Product Brand'
                                            name='brandId'
                                            initialValue={initialBrand}
                                            className='font-medium text-[#08090F]'
                                            rules={[{ required: true, message: 'Please input your brand!' }]}
                                        >
                                            <Select
                                                size='large'
                                                // onChange={handleChangeBrand}
                                                className='w-full'
                                                options={brands?.map((brand) => ({
                                                    label: brand.name,
                                                    value: brand._id,
                                                }))}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                                        <h3 className='my-2 text-lg font-medium text-[#08090F]'>Inventory </h3>
                                        <div className='grid grid-cols-1 gap-2'>
                                            {/* <Form.Item<IProductForm>
                                            className='font-medium text-[#08090F]'
                                            label='Product Sku'
                                            name='sku'
                                            rules={[{ required: true, message: 'Please input your sku!' }]}
                                        >
                                            <InputNumber size='large' className='w-full' />
                                        </Form.Item> */}
                                            <Form.Item<IProductForm>
                                                className='font-medium text-[#08090F]'
                                                label='Product Stock'
                                                name='stock'
                                                rules={[
                                                    {
                                                        validator: async (_, stock) => {
                                                            const tenThounsand = 10000;
                                                            if (!stock) {
                                                                return errorMessage('Please input your stock!');
                                                            }
                                                            if (stock < 0) {
                                                                return errorMessage('Stock must be larger than zero');
                                                            }
                                                            if (stock >= tenThounsand) {
                                                                return errorMessage(
                                                                    'Stock must be smaller than ten thousand!'
                                                                );
                                                            }
                                                            return Promise.resolve();
                                                        },
                                                    },
                                                ]}
                                            >
                                                <InputNumber size='large' className='w-full' />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                )}
        </>
    );
};
export default CreateProduct;
