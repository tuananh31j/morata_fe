import { PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormProps, Image, Input, Select, Upload, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllAtributes } from '~/hooks/attributes/Queries/useGetAttributesByCate';
import useCreateProduct from '~/hooks/products/Mutations/useCreateProduct';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
import { IAttributesValue } from '~/types/Attributes';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IProductForm } from '~/types/Product';
import showMessage from '~/utils/ShowMessage';
import {
    brandValidator,
    categoryValidator,
    imagesValidator,
    nameValidator,
    thumbnailValidator,
    variationsValidator,
} from '~/validation/Products/validators';
import AttributesItem from './_component/AttributesItem';
import VariationItem from './_component/VariationItem';
import { handleCreateProduct } from './Helper/handleCreateProduct';
import { FileType, getBase64 } from './Helper/_helper_';
import { UploadButton } from './_component/UploadButton';

const CreateProduct = () => {
    const [previewImagesOpen, setPreviewImagesOpen] = useState<boolean>(false);
    const [previewImages, setPreviewImages] = useState<string>('');
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
    const [imagesfileList, setImagesFileList] = useState<UploadFile[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const [attributesFile, setAttributesFile] = useState<UploadFile[][]>([]);
    const [isChooseCategory, setIsChooseCategory] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<string>('');
    const { data: attributesRes, isLoading: isAttributeLoading } = useGetAllAtributes(categoryId);
    const attributesForProduct = attributesRes?.data?.productAttributes?.attributeIds;
    const attributesForVariant = attributesRes?.data?.variantAttribute?.attributeIds;
    const categoriesAndBrandData = useGetCategoriesAndBrands();
    const {
        mutateAsync: createProduct,
        data: createProductData,
        isError,
        isSuccess,
        error,
        isPending,
    } = useCreateProduct();
    const [form] = Form.useForm<IProductForm>();
    const navigate = useNavigate();
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
    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);

    const handleChangeAttributeThumbnail = (index: number): UploadProps['onChange'] => {
        return ({ fileList: newFileList }) => {
            const newAttributesFile = [...attributesFile];
            newAttributesFile[index] = newFileList;
            setAttributesFile(newAttributesFile);
        };
    };
    const handleRemoveAttributeThumbnail = (index: number) => {
        const newAttributesFile = [...attributesFile];
        newAttributesFile[index] = [];
        setAttributesFile(newAttributesFile);
    };

    const onFinish: FormProps<IProductForm>['onFinish'] = (values) => {
        console.log(values);
        handleCreateProduct(values, createProduct);
    };

    const handleChangeCat = (value: string) => {
        setCategoryId(value);
        setIsChooseCategory(true);
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
    }, [createProductData, isError, error, form, isSuccess]);
    /* eslint-enable */
    return (
        <>
            <div className='mx-6 rounded-lg bg-white px-4 py-6 capitalize'>
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
                                Add product
                            </Button>
                        </Form.Item>

                        <div className='grid grid-cols-1 gap-4'>
                            <Card title='Tags'>
                                <div>
                                    <Form.Item<IProductForm>
                                        label='Product Category'
                                        name='categoryId'
                                        required
                                        className='font-medium text-[#08090F]'
                                        rules={[categoryValidator()]}
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
                                        rules={[brandValidator()]}
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
                            </Card>
                            <Card title='Product Media'>
                                <div>
                                    <h3 className='my-2 text-lg font-medium text-[#08090F]'>Product Media</h3>
                                    <Form.Item<IProductForm>
                                        label='Product Images'
                                        name='images'
                                        className='font-medium text-[#08090F]'
                                        dependencies={['images']}
                                        rules={[
                                            {
                                                validator: imagesValidator,
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
                                            {imagesfileList.length >= 5 ? null : UploadButton}
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
                                        dependencies={['thumbnail']}
                                        rules={[
                                            {
                                                validator: thumbnailValidator,
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
                                            {thumbnailFile.length >= 1 ? null : UploadButton}
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
                                </div>
                            </Card>
                            <Card title='General information'>
                                <div>
                                    <Form.Item<IProductForm>
                                        label='Product Name'
                                        name='name'
                                        className='font-medium text-[#08090F]'
                                        rules={[
                                            {
                                                validator: nameValidator,
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
                            </Card>

                            <Card loading={isAttributeLoading} title='Attributes'>
                                <div className={clsx(!isChooseCategory && 'pointer-events-none opacity-60')}>
                                    {!isChooseCategory && (
                                        <span className='mb-4 inline-block'>
                                            Can be selected when selecting a category
                                        </span>
                                    )}
                                    {isChooseCategory && (
                                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                            {attributesForProduct?.map((attribute: IAttributesValue, index: number) => (
                                                <AttributesItem attribute={attribute} key={index} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Card>
                            <Card title='Variations'>
                                <div className={clsx(!isChooseCategory && 'pointer-events-none opacity-60')}>
                                    {!isChooseCategory && (
                                        <span className='mb-4 inline-block'>
                                            Can be selected when selecting a category
                                        </span>
                                    )}
                                    <Form.List
                                        name='variations'
                                        rules={[
                                            {
                                                validator: variationsValidator,
                                            },
                                        ]}
                                    >
                                        {(fields, { add, remove }, { errors }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }, index) => {
                                                    return (
                                                        <VariationItem
                                                            key={key}
                                                            index={index}
                                                            attributesForVariant={attributesForVariant}
                                                            fieldName={name}
                                                            restField={restField}
                                                            variantFile={attributesFile}
                                                            handleChangeThumbnail={handleChangeAttributeThumbnail}
                                                            handleRemoveThumbnail={handleRemoveAttributeThumbnail}
                                                            removeVariation={remove}
                                                        />
                                                    );
                                                })}
                                                <Form.Item>
                                                    <Button
                                                        type='dashed'
                                                        htmlType='button'
                                                        onClick={() => add()}
                                                        block
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Add variation
                                                    </Button>
                                                </Form.Item>
                                                {isChooseCategory && errors && (
                                                    <Form.ErrorList errors={errors} className='text-red' />
                                                )}
                                            </>
                                        )}
                                    </Form.List>
                                </div>
                            </Card>
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
                                Add product
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};
export default CreateProduct;
