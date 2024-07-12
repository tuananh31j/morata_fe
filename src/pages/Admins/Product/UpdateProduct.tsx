import { DollarOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
    Button,
    Checkbox,
    CheckboxProps,
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
import { useNavigate, useParams } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
import productService from '~/services/product.service';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IProductForm, ITagsType } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';
import { errorMessage } from '~/validation/Product';
import useUpdateProduct from '~/hooks/products/Mutations/useUpdateProduct';
import useGetDetailProduct from '~/hooks/products/Queries/useGetDetailProduct';

const ACCEPT_FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];
const MAX_SIZE = 5000000;

// const onFinishFailed: FormProps<IProductForm>['onFinishFailed'] = (errorInfo) => {
//     console.log('Failed:', errorInfo);
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

const UpdateProduct = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [previewImagesOpen, setPreviewImagesOpen] = useState<boolean>(false);
    const [previewImages, setPreviewImages] = useState<string>('');
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const [previewOldThumbnailOpen, setPreviewOldThumbnailOpen] = useState<boolean>(false);
    const [previewOldImagesOpen, setPreviewOldImagesOpen] = useState<boolean>(false);
    const [isKeepOldImages, setIsKeepOldImages] = useState<boolean>(true);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
    const [imagesfileList, setImagesFileList] = useState<UploadFile[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const categoriesAndBrandData = useGetCategoriesAndBrands();
    const { data: productData, isLoading: productDetailLoading } = useGetDetailProduct(id ?? '');
    const firstIndexElement = 0;
    const productDetail = productData?.data;
    const {
        mutate: updateProduct,
        data: updateProductData,
        isError,
        isSuccess,
        error,
        isPending,
    } = useUpdateProduct(id ?? '');
    const [form] = Form.useForm<IProductForm>();
    const navigate = useNavigate();
    const dataIndex = {
        brands: 0,
        categories: 1,
    };

    const categories = categoriesAndBrandData?.[dataIndex.categories].data?.data;
    const brands = categoriesAndBrandData?.[dataIndex.brands].data?.data;

    const productDetailCategory = categories?.filter((category) => category._id === productDetail?.categoryId)[
        firstIndexElement
    ];
    // initial category
    const initialCategory = {
        label: productDetailCategory?.name,
        value: productDetailCategory?._id,
    };

    const productDetauilBrand = brands?.filter((category) => category._id === productDetail?.brandId)[
        firstIndexElement
    ];
    // initial brand
    const initialBrand = {
        label: productDetauilBrand?.name,
        value: productDetauilBrand?._id,
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
    const randomUpperOrLowerCase = (char: string) => {
        char = char.replace(' ', '');
        return Math.floor(Math.random() * 2) === 0 ? char.toUpperCase() : char.toLowerCase();
    };

    const handleChangeImages: UploadProps['onChange'] = ({ fileList: newFileList }) => setImagesFileList(newFileList);
    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);

    const handleCreateProduct = (data: IProductForm) => {
        const formData = new FormData();
        const dataTransfer = new DataTransfer();
        const { name, price, stock, images, thumbnail, description, brandId, categoryId } = data;
        const categoryIdValue = typeof categoryId === 'object' ? categoryId.value : categoryId;
        const brandIdValue = typeof brandId === 'object' ? brandId.value : brandId;

        /* eslint-disable */
        if (images?.fileList && thumbnail?.file && !isKeepOldImages) {
            for (const file of images?.fileList) {
                dataTransfer.items.add((file as any).originFileObj as FileType);
                const firstImage = dataTransfer.files[0];
                formData.append('images', firstImage);
                dataTransfer.items.clear();
            }
            formData.append('thumbnail', thumbnail?.file);
        }
        /* eslint-enable */
        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('stock', stock.toString());
        formData.append('categoryId', categoryIdValue);
        formData.append('brandId', brandIdValue);
        formData.append('description', description);
        // formData.append('sku', sku);
        // Mutation to create product
        updateProduct(formData);
    };
    console.log(productDetail);
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const onFinish: FormProps<IProductForm>['onFinish'] = (values) => {
        handleCreateProduct(values);
    };
    const handleChangeCat = (value: ITagsType) => {
        console.log(`selected`, value);
    };
    const onChange: CheckboxProps['onChange'] = (e) => {
        setIsKeepOldImages(e.target.checked);
    };
    /* eslint-disable */
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
        if (isSuccess) {
            form.resetFields();
            setImagesFileList([]);
            setThumbnailFile([]);
            showMessage('Update product successfully', 'success');
            setTimeout(() => {
                queryClient.prefetchQuery({
                    queryKey: [QUERY_KEY.PRODUCTS],
                    queryFn: () => productService.getAll(),
                });
            }, 1000);
            navigate('/admin/products');
        }
    }, [updateProductData, isError, error, form, isSuccess]);
    /* eslint-enable */
    return (
        <>
            <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                <div className='m-auto w-[60vw] sm:w-[50vw]'>
                    {!productDetailLoading && (
                        <Form
                            layout='vertical'
                            form={form}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete='off'
                        >
                            <Form.Item className='flex justify-end'>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<PlusSquareOutlined />}
                                    className='mr-3 px-5'
                                    loading={isPending}
                                    disabled={isPending}
                                    size='large'
                                >
                                    Add product
                                </Button>
                            </Form.Item>
                            <div className='grid grid-cols-1 gap-4'>
                                <div className='rounded-lg border border-black border-opacity-20 p-2 px-4'>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>General information</h3>
                                    <Form.Item<IProductForm>
                                        label='Product Name'
                                        name='name'
                                        initialValue={productDetail?.name}
                                        className='font-medium text-[#08090F]'
                                        rules={[
                                            {
                                                validator: async (_, name) => {
                                                    if (!name) {
                                                        return errorMessage('Please input your name!');
                                                    }
                                                    if (name.length < 3) {
                                                        return errorMessage('Name must be at least 3 characters long');
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
                                        initialValue={productDetail?.description}
                                        className='font-medium text-[#08090F]'
                                    >
                                        <TextArea rows={4} className='w-full' />
                                    </Form.Item>
                                </div>
                                <div className='rounded-lg border border-black border-opacity-20 p-2 px-4'>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>Pricing</h3>
                                    <Form.Item<IProductForm>
                                        className='font-medium text-[#08090F]'
                                        label='Product Price'
                                        initialValue={productDetail?.price}
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
                                        initialValue={productDetail?.discountPercentage}
                                        name='discountPercentage'
                                        rules={[{ required: true, message: 'Please input your discount!' }]}
                                    >
                                        <InputNumber size='large' max={100} min={0} className='w-full' />
                                    </Form.Item>
                                </div>
                                <div className='rounded-lg border border-black border-opacity-20 p-2 px-4'>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>Product Media</h3>
                                    <Checkbox
                                        onChange={onChange}
                                        defaultChecked={true}
                                        className='my-2 select-none font-medium text-[#08090F]'
                                    >
                                        Keep old images
                                    </Checkbox>
                                    <Form.Item<IProductForm>
                                        label='Product Images'
                                        name='images'
                                        className='font-medium text-[#08090F]'
                                        rules={[
                                            {
                                                validator: async (_, images) => {
                                                    if (!images) {
                                                        return Promise.resolve();
                                                    }
                                                    /* eslint-disable */
                                                    for (const file of images?.fileList) {
                                                        if (file?.size >= MAX_SIZE) {
                                                            return errorMessage('Image size must be smaller than 5MB!');
                                                        } else if (
                                                            file?.type &&
                                                            !ACCEPT_FILE_TYPE.includes(images?.file.type)
                                                        ) {
                                                            return errorMessage('Only accept png, jpg and jpeg type!');
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
                                    {isKeepOldImages && (
                                        <div>
                                            <h4 className='mb-1 font-medium text-[#08090F]'>Old Images:</h4>
                                            <div className='flex flex-wrap gap-3'>
                                                {productDetail?.images.map((url, index) => (
                                                    <div
                                                        key={index}
                                                        className='inline-block rounded-lg border border-black border-opacity-10 p-1'
                                                    >
                                                        <Image
                                                            width={100}
                                                            height={100}
                                                            className='object-contain'
                                                            preview={{
                                                                visible: previewOldImagesOpen,
                                                                onVisibleChange: (visible) =>
                                                                    setPreviewOldImagesOpen(visible),
                                                                // afterOpenChange: (visible) =>
                                                                //     !visible && setPreviewThumbnail(''),
                                                            }}
                                                            src={url}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <Form.Item<IProductForm>
                                        label='Product Thumbnail'
                                        name='thumbnail'
                                        className='font-medium text-[#08090F]'
                                        rules={[
                                            {
                                                validator: async (_, thumbnail) => {
                                                    if (!thumbnail) {
                                                        return Promise.resolve();
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
                                    {isKeepOldImages && (
                                        <div>
                                            <h4 className='mb-1 font-medium text-[#08090F]'>Old Thumbnail:</h4>
                                            <div className='inline-block rounded-lg border border-black border-opacity-10 p-1'>
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    className='object-contain'
                                                    preview={{
                                                        visible: previewOldThumbnailOpen,
                                                        onVisibleChange: (visible) =>
                                                            setPreviewOldThumbnailOpen(visible),
                                                        // afterOpenChange: (visible) => !visible && setPreviewThumbnail(''),
                                                    }}
                                                    src={productDetail?.thumbnail}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='rounded-lg border border-black border-opacity-20 p-2 px-4'>
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
                                            onChange={handleChangeCat}
                                            labelInValue
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
                                <div className='rounded-lg border border-black border-opacity-20 p-2 px-4'>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>Inventory </h3>
                                    <div className='grid grid-cols-1 gap-2'>
                                        <Form.Item<IProductForm>
                                            className='font-medium text-[#08090F]'
                                            label='Product Stock'
                                            initialValue={productDetail?.stock}
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
                    )}
                </div>
            </div>
        </>
    );
};
export default UpdateProduct;
