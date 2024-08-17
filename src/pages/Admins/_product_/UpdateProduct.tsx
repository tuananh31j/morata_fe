import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormProps, Image, Input, Select, Upload, UploadFile, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetAllAtributes } from '~/hooks/attributes/Queries/useGetAttributesByCate';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
import { IAttributesValue } from '~/types/Attributes';
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
import { FileType, getBase64 } from './Helper/_helper_';
import { UploadButton } from './_component/UploadButton';
import useGetDetailProductAdmin from '~/hooks/products/Queries/useGetDetailProductAdmin';
import { handleEditProduct } from './Helper/handleEditProduct';
import useUpdateProduct from '~/hooks/products/Mutations/useUpdateProduct';
import useUpdateProductVariant from '~/hooks/products/Mutations/useUpdateProductVariant';
import useCreateProductVariant from '~/hooks/products/Mutations/useCreateProductVariant';
import CustomItemRender from './_component/CustomItemRender';
import convertApiResponseToFileList from './Helper/convertImageUrlToFileList';
import convertData from './Helper/convertData';
import { DataTypeConvert } from '~/constants/enum';

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // @initial form values
    const [initialValues, setInitialValues] = useState<any>();

    // @preview images
    const [previewImagesOpen, setPreviewImagesOpen] = useState<boolean>(false);
    const [previewImages, setPreviewImages] = useState<string>('');
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');

    // @images
    const [imagesfileList, setImagesFileList] = useState<UploadFile[]>([]);

    // @thumbnail
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);

    // @variany images
    const [variantFile, setVariantFile] = useState<UploadFile[][]>([]);

    // @choose category
    const [categoryIdNew, setCategoryIdNew] = useState<string>('');

    // Query
    const { data } = useGetDetailProductAdmin(id as string);
    const productDetails = data?.data;
    const { data: attributesRes } = useGetAllAtributes(categoryIdNew || productDetails?.categoryId._id || '');
    const attributesForProduct = attributesRes?.data.productAttributes.attributeIds;
    const attributesForVariant = attributesRes?.data.variantAttribute.attributeIds;
    const [brandsRes, categoriesRes] = useGetCategoriesAndBrands();
    const categories = categoriesRes.data?.data;
    const brands = brandsRes.data?.data;

    // Mutation
    const { mutate: updateProduct, isSuccess: isSuccessProduct, isPending } = useUpdateProduct();
    const { mutate: updateProductVariant, isSuccess: isSuccessVariantUpdate } = useUpdateProductVariant();
    const { mutate: createProductVariant, isSuccess: isSuccessVariantCreate } = useCreateProductVariant();

    // @Form
    const [form] = Form.useForm<IProductForm>();

    // @Handle
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

    const handleChangeCat = (value: string) => {
        const dataSource = initialValues;
        if (productDetails && value !== productDetails.categoryId._id) {
            dataSource.variations = '';
            dataSource.attributes = '';
            dataSource.categoryId = categoryIdNew;
            setVariantFile([]);
        } else {
            setVariantFile(initialValues.initialVariantFile);
        }
        form.setFieldsValue(dataSource);
        setImagesFileList(initialValues.initialImages);
        setThumbnailFile(initialValues.initialThumbnail);
        setCategoryIdNew(value);
    };

    const handleChangeImages: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setImagesFileList(newFileList);
    };
    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);

    const handleChangeAttributeThumbnail = (index: number): UploadProps['onChange'] => {
        return ({ fileList: newFileList }) => {
            console.log(newFileList, 'newFileList');
            const newVariantFile = [...variantFile];
            newVariantFile[index] = newFileList;
            setVariantFile(newVariantFile);
        };
    };
    const handleRemoveAttributeThumbnail = (index: number) => {
        const newVariantFile = [...variantFile];
        newVariantFile[index] = [];
        setVariantFile(newVariantFile);
    };

    const onFinish: FormProps<IProductForm>['onFinish'] = (values) => {
        console.log(values, 'values');
        if (productDetails) {
            handleEditProduct({
                productId: id as string,
                data: values,
                imagesInit: imagesfileList,
                updateProduct,
                updateProductVariant,
                createProductVariant,
            });
        }
    };
    const onReset = () => {
        form.setFieldsValue(initialValues.initialValue);
        setImagesFileList(initialValues.initialImages);
        setThumbnailFile(initialValues.initialThumbnail);
        setVariantFile(initialValues.initialVariantFile);
    };
    useEffect(() => {
        if (productDetails) {
            setCategoryIdNew(productDetails.categoryId._id);
        }
    }, [productDetails]);
    useEffect(() => {
        if (productDetails) {
            const {
                attributes,
                variationIds,
                thumbnail,
                thumbnailUrlRef,
                images,
                imageUrlRefs,
                categoryId,
                brandId,
                ...rest
            } = productDetails;

            const imagesConvert = images.map((url, i) =>
                convertApiResponseToFileList({ url, urlRef: imageUrlRefs[i] })
            ) as UploadFile<any>[];
            const thumbnailConvert = convertApiResponseToFileList({
                url: thumbnail,
                urlRef: thumbnailUrlRef,
                isArr: true,
            }) as UploadFile<any>[];

            const attConvert = convertData({ data: attributes, to: DataTypeConvert.obj });
            let newVariantFile: UploadFile<any>[][] = [];
            const variaConverts = variationIds.map((varia, i) => {
                let variantAttributes;
                if (varia.variantAttributes) {
                    variantAttributes = convertData({ data: varia.variantAttributes, to: DataTypeConvert.obj });
                }
                const image = convertApiResponseToFileList({
                    url: varia.image!,
                    urlRef: varia.imageUrlRef,
                    isArr: true,
                }) as UploadFile<any>[];
                newVariantFile = [...variantFile];
                newVariantFile[i] = image;
                setVariantFile((prev) => [...prev, image]);
                console.log(varia, 'varia');
                const newVaria = { ...varia, variantAttributes, thumbnail: image };
                delete newVaria.image;
                return newVaria;
            });

            const initial: any = {
                images: imagesConvert,
                thumbnail: thumbnailConvert,
                attributes: attConvert,
                categoryId: categoryId._id,
                variations: variaConverts,
                brandId: brandId._id,
                ...rest,
            };
            console.log(variaConverts, 'variaConverts');
            setImagesFileList(imagesConvert);
            setThumbnailFile(thumbnailConvert);
            setInitialValues({
                initialValue: initial,
                initialImages: imagesConvert,
                initialThumbnail: thumbnailConvert,
                initialVariantFile: newVariantFile,
            });

            form.setFieldsValue(initial as any);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productDetails]);

    useEffect(() => {
        if (isSuccessProduct || isSuccessVariantUpdate || isSuccessVariantCreate) {
            showMessage('Update product is successfully', 'success');
            navigate('/admin/products');
        }
    }, [isSuccessProduct, isSuccessVariantUpdate, isSuccessVariantCreate, navigate]);
    return (
        <div className='mx-6 rounded-lg bg-white px-4 py-6'>
            <div className='m-auto mb-10'>
                {productDetails && (
                    <Form layout='vertical' form={form} onFinish={onFinish} autoComplete='off' className='capitalize'>
                        <div className='flex justify-end'>
                            <Link to='/admin/products' className='mr-3 p-4 underline'>
                                Back to list
                            </Link>
                        </div>

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
                                            onChange={handleChangeCat}
                                            size='large'
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
                                        // valuePropName='fileList'
                                        // getValueFromEvent={normFile}
                                        required
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
                                            onRemove={() => setImagesFileList([])}
                                            fileList={imagesfileList}
                                            itemRender={CustomItemRender}
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
                                        required
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
                                            itemRender={CustomItemRender}
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
                                        required
                                        className='font-medium text-[#08090F]'
                                        rules={[
                                            {
                                                validator: nameValidator,
                                                required: true,
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

                            {attributesForProduct && (
                                <>
                                    <Card title='Attributes'>
                                        <div>
                                            <span className='mb-4 inline-block'>
                                                Can be selected when selecting a category
                                            </span>
                                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                                {attributesForProduct?.map(
                                                    (attribute: IAttributesValue, index: number) => (
                                                        <AttributesItem attribute={attribute} key={index} />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                    <Card title='Variations'>
                                        <div
                                            className={clsx(
                                                form.getFieldValue('categoryId') ||
                                                    (categoryIdNew && 'pointer-events-none opacity-60')
                                            )}
                                        >
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
                                                            const idProductVariant = form.getFieldValue([
                                                                'variations',
                                                                name,
                                                                '_id',
                                                            ]);
                                                            return (
                                                                <VariationItem
                                                                    key={key}
                                                                    index={index}
                                                                    attributesForVariant={attributesForVariant}
                                                                    fieldName={name}
                                                                    restField={restField}
                                                                    variantFile={variantFile}
                                                                    handleChangeThumbnail={
                                                                        handleChangeAttributeThumbnail
                                                                    }
                                                                    handleRemoveThumbnail={
                                                                        handleRemoveAttributeThumbnail
                                                                    }
                                                                    removeVariation={remove}
                                                                    id={idProductVariant}
                                                                />
                                                            );
                                                        })}
                                                        <Form.Item>
                                                            <Button
                                                                htmlType='button'
                                                                type='dashed'
                                                                onClick={() => add()}
                                                                block
                                                                icon={<PlusOutlined />}
                                                            >
                                                                Add variation
                                                            </Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                        </div>
                                    </Card>
                                </>
                            )}
                        </div>
                        <div className='sticky bottom-0 right-0 my-2 flex justify-end border-t-2 border-black border-opacity-5 bg-white p-4'>
                            <Button
                                type='primary'
                                htmlType='submit'
                                icon={<EditOutlined />}
                                className='mr-3 px-5'
                                loading={isPending}
                                disabled={isPending}
                                size='large'
                            >
                                Edit product
                            </Button>
                            <Button
                                type='dashed'
                                htmlType='button'
                                onClick={onReset}
                                className='mr-3 px-5'
                                size='large'
                            >
                                Reset
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    );
};
export default UpdateProduct;
