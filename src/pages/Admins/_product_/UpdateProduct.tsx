import { MinusCircleOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    FormProps,
    GetProp,
    Image,
    Input,
    InputNumber,
    Select,
    Space,
    Upload,
    UploadFile,
    UploadProps,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetAllAtributes } from '~/hooks/attributes/Queries/useGetAttributesByCate';
import useUpdateProduct from '~/hooks/products/Mutations/useUpdateProduct';
import useGetDetailProduct from '~/hooks/products/Queries/useGetDetailProduct';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
import { IAttributesValue } from '~/types/Attributes';
import { IAxiosResponse } from '~/types/AxiosResponse';
import {
    IProductFiles,
    IProductForm,
    IProductVariation,
    IThumbnailAntd,
    IVariationDetailResponse,
} from '~/types/Product';
import showMessage from '~/utils/ShowMessage';
import AttributesItem from './_component/AttributesItem';
import { uploadButton } from './_component/UploadButton';
import useUpdateVariantions from '~/hooks/products/Mutations/useUpdateVariantions';
import useCreateVariantions from '~/hooks/products/Mutations/useCreateVariantions';
import { errorMessage } from '~/validation/Products/Product';

const ACCEPT_FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg'];
const MAX_SIZE = 5000000;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UpdateProduct = () => {
    const { id } = useParams();
    const [previewImagesOpen, setPreviewImagesOpen] = useState<boolean>(false);
    const [previewImages, setPreviewImages] = useState<string>('');
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
    const [imagesfileList, setImagesFileList] = useState<UploadFile[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const [attributesFile, setAttributesFile] = useState<UploadFile[][]>([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const currentIndex = useRef<number>(0);
    const { data: attributesRes } = useGetAllAtributes(categoryId);
    const attributesResData = attributesRes?.data.productAttributes.attributeIds;
    const categoriesAndBrandData = useGetCategoriesAndBrands();
    const {
        mutate: updateProduct,
        data: updateProductData,
        isError,
        isSuccess,
        error,
        isPending,
    } = useUpdateProduct(id as string);
    const { data: productResponse, isLoading: isDetailLoading } = useGetDetailProduct(id as string);
    const productData = productResponse?.data;
    // const { mutate: updateVariantions } = useUpdateVariantions(id as string);
    // const { mutate: createVariations } = useCreateVariantions();
    const [form] = Form.useForm<IProductForm>();
    const navigate = useNavigate();
    const [variationsImageUrl, setVariantionsImageUrl] = useState<string[]>([]);
    const dataIndex = {
        brands: 0,
        categories: 1,
    };
    // const firstElement = 0;
    const categories = categoriesAndBrandData?.[dataIndex.categories].data?.data;
    const brands = categoriesAndBrandData?.[dataIndex.brands].data?.data;

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
    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setThumbnailFile(newFileList);
    };
    const handleChangeAttributeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        const newAttributesFile = [...attributesFile];
        newAttributesFile[currentIndex.current] = newFileList;
        setAttributesFile(newAttributesFile);
    };
    const handleRemoveAttributeThumbnail = () => {
        const newAttributesFile = [...attributesFile];
        newAttributesFile[currentIndex.current] = [];
        setAttributesFile(newAttributesFile);
    };
    const handleCreateProduct = (data: IProductForm) => {
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
        console.log(variations);
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
            for (const [, varation] of Object.entries(variations)) {
                // varation.thumbnail?.fileList.forEach((file) => {
                //     Object.assign(file, { name: `${file.name}` });
                // });
                formData.append('variationImages', varation.thumbnail?.fileList?.[firstElement].originFileObj as File);
                Object.assign(varation, {
                    imageUrlRef: varation.thumbnail?.fileList[firstElement].name,
                });

                // Delete thumbnail
                const { thumbnail, ...rest } = varation;
                newVariations.push(rest);
            }
        }
        /* eslint-enable */
        formData.append('name', name);
        formData.append('attributes', JSON.stringify(attributesData));
        // formData.append('variationsString', JSON.stringify(newVariations));

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
    };
    const onFinish: FormProps<IProductForm>['onFinish'] = (values) => {
        handleCreateProduct(values);
        // console.log(values);
    };
    const handleChangeCat = (value: string) => {
        setCategoryId(value);
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
            showMessage('Create product successfully', 'success');
            navigate('/admin/products');
        }
        if (!isDetailLoading) {
            setCategoryId(productData?.categoryId._id as string);
        }
        if (!isDetailLoading) {
            const values = form.getFieldsValue(['variations']);
            setVariantionsImageUrl(values.variations.map((variation: IVariationDetailResponse) => variation.image));
        }
    }, [updateProductData, isError, error, form, isSuccess, isDetailLoading]);
    /* eslint-enable */

    return (
        <>
            {!isDetailLoading && (
                <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                    <div className='m-auto'>
                        <Form layout='vertical' form={form} onFinish={onFinish} autoComplete='off'>
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
                                    Update product
                                </Button>
                                <Link to='/admin/products' className='mr-3 px-5'>
                                    Back to list
                                </Link>
                            </Form.Item>

                            <div className='grid grid-cols-1 gap-4'>
                                <div className='rounded-lg border border-black border-opacity-20 p-2 px-4'>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>Product Media</h3>
                                    <Form.Item<IProductForm>
                                        label='Product Images'
                                        name='images'
                                        className='font-medium text-[#08090F]'
                                        dependencies={['images']}
                                        rules={[
                                            {
                                                validator: async (_, images: IProductFiles) => {
                                                    if (images?.fileList?.length < 1 || !images) {
                                                        return errorMessage('Please input your images!');
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
                                    <div className='my-4 grid grid-cols-8'>
                                        {productData?.images.map((url, index) => <Image key={index} src={url} />)}
                                    </div>
                                    <Form.Item<IProductForm>
                                        label='Product Thumbnail'
                                        name='thumbnail'
                                        className='font-medium text-[#08090F]'
                                        dependencies={['thumbnail']}
                                        rules={[
                                            {
                                                validator: async (_, thumbnail: IProductFiles) => {
                                                    if (thumbnail?.fileList?.length < 1 || !thumbnail) {
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
                                    {productData?.thumbnail && (
                                        <div className='my-2'>
                                            <Image
                                                // preview={{
                                                //     visible: previewThumbnailOpen,
                                                //     onVisibleChange: (visible) => setPreviewThumbnailOpen(visible),
                                                //     afterOpenChange: (visible) => !visible && setPreviewThumbnail(''),
                                                // }}
                                                src={productData?.thumbnail}
                                                className='w-[80px]'
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className='rounded-lg border border-black border-opacity-20 p-2 px-4'>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>General information</h3>
                                    <Form.Item<IProductForm>
                                        label='Product Name'
                                        name='name'
                                        className='font-medium text-[#08090F]'
                                        initialValue={productData?.name}
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
                                        initialValue={productData?.description}
                                        className='font-medium text-[#08090F]'
                                    >
                                        <TextArea rows={4} className='w-full' />
                                    </Form.Item>
                                </div>

                                <div className='rounded-lg border border-black border-opacity-20 p-2 px-4'>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>Tags</h3>

                                    <Form.Item<IProductForm>
                                        label='Product Category'
                                        name='categoryId'
                                        required
                                        className='font-medium text-[#08090F]'
                                        initialValue={productData?.categoryId._id}
                                        rules={[{ required: true, message: 'Please input your category!' }]}
                                        validateTrigger={['onChange', 'onBlur']}
                                    >
                                        <Select
                                            size='large'
                                            onChange={handleChangeCat}
                                            placeholder='Choose category'
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
                                        className='font-medium text-[#08090F]'
                                        initialValue={productData?.brandId}
                                        rules={[{ required: true, message: 'Please input your brand!' }]}
                                        validateTrigger={['onChange', 'onBlur']}
                                    >
                                        <Select
                                            size='large'
                                            className='w-full'
                                            placeholder='Choose brand'
                                            options={brands?.map((brand) => ({
                                                label: brand.name,
                                                value: brand._id,
                                            }))}
                                        />
                                    </Form.Item>
                                </div>
                                <div className={clsx('rounded-lg border border-black border-opacity-20 p-2 px-4')}>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>Attributes</h3>

                                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                        {attributesResData?.map((attribute: IAttributesValue, index: number) => (
                                            <AttributesItem
                                                attribute={attribute}
                                                key={index}
                                                defaultValue={productData?.attributes}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={clsx('rounded-lg border border-black border-opacity-20 p-2 px-4')}>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>Variations</h3>

                                    <Form.List
                                        name='variations'
                                        initialValue={productData?.variationIds}
                                        rules={[
                                            {
                                                validator: async (_, variations: IProductVariation[]) => {
                                                    if (!variations || variations.length < 1) {
                                                        return errorMessage('Please input your variations!');
                                                    }
                                                    const variationEmpty = variations.some(
                                                        (variation) => variation === undefined
                                                    );
                                                    if (variationEmpty) {
                                                        return errorMessage('Please input your variations!');
                                                    }
                                                    return Promise.resolve();
                                                },
                                            },
                                        ]}
                                    >
                                        {(fields, { add, remove }, { errors }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }, index) => {
                                                    const oldImageUrl = variationsImageUrl[index];
                                                    return (
                                                        <Space key={key} align='center'>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'thumbnail']}
                                                                rules={[
                                                                    {
                                                                        validator: async (
                                                                            _,
                                                                            thumbnail: IProductFiles
                                                                        ) => {
                                                                            if (
                                                                                thumbnail?.fileList?.length < 1 ||
                                                                                !thumbnail
                                                                            ) {
                                                                                return Promise.resolve();
                                                                            }
                                                                            if (thumbnail?.file.size >= MAX_SIZE) {
                                                                                return errorMessage(
                                                                                    'Image size must be smaller than 5MB!'
                                                                                );
                                                                            }
                                                                            if (
                                                                                thumbnail?.file.type &&
                                                                                !ACCEPT_FILE_TYPE.includes(
                                                                                    thumbnail?.file.type
                                                                                )
                                                                            ) {
                                                                                return errorMessage(
                                                                                    'Only accept png, jpg and jpeg type!'
                                                                                );
                                                                            }

                                                                            return Promise.resolve();
                                                                        },
                                                                    },
                                                                ]}
                                                            >
                                                                <Upload
                                                                    beforeUpload={() => false}
                                                                    listType='picture'
                                                                    fileList={attributesFile[index]}
                                                                    onChange={(fileList) => {
                                                                        currentIndex.current = index;
                                                                        handleChangeAttributeThumbnail(fileList);
                                                                    }}
                                                                    maxCount={1}
                                                                >
                                                                    {attributesFile[index]?.length >= 1 ? null : (
                                                                        <Button className='border-none bg-stone-50 outline-none'>
                                                                            Upload
                                                                        </Button>
                                                                    )}
                                                                </Upload>
                                                            </Form.Item>
                                                            <Image
                                                                className='w-[80px]'
                                                                alt='variation thumbnail'
                                                                src={oldImageUrl}
                                                            />
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'color']}
                                                                label='Color'
                                                                rules={[
                                                                    { required: true, message: 'Please input color' },
                                                                ]}
                                                            >
                                                                <Input placeholder='Color' className='w-full' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'price']}
                                                                label='Price'
                                                                rules={[
                                                                    { required: true, message: 'Please input price' },
                                                                ]}
                                                            >
                                                                <InputNumber placeholder='Price' className='w-full' />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'stock']}
                                                                label='stock'
                                                                rules={[
                                                                    { required: true, message: 'Please input color' },
                                                                ]}
                                                            >
                                                                <InputNumber placeholder='Stock' className='w-full' />
                                                            </Form.Item>
                                                            <MinusCircleOutlined
                                                                onClick={() => {
                                                                    currentIndex.current = index;
                                                                    handleRemoveAttributeThumbnail();
                                                                    setVariantionsImageUrl(
                                                                        variationsImageUrl.filter(
                                                                            (url, urlIndex) => urlIndex !== index
                                                                        )
                                                                    );
                                                                    remove(name);
                                                                }}
                                                                className='text-lg'
                                                            />
                                                        </Space>
                                                    );
                                                })}
                                                <Form.Item>
                                                    <Button
                                                        type='dashed'
                                                        onClick={() => add()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add variation
                                                    </Button>
                                                </Form.Item>
                                                <Form.ErrorList errors={errors} className='text-red' />
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            </div>
                            <div className='my-2 flex justify-end'>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<PlusSquareOutlined />}
                                    className='mr-3 px-5'
                                    loading={isPending}
                                    disabled={isPending}
                                    size='large'
                                >
                                    Update product
                                </Button>
                                <Button type='dashed' htmlType='reset' className='mr-3 px-5' size='large'>
                                    Reset
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </>
    );
};
export default UpdateProduct;
