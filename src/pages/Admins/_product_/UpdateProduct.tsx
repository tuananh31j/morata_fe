import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
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
import VariationItem from './_component/CreateProduct/VariationItem';
import { FileType, getBase64 } from './_component/Helper/_helper_';
import { uploadButton } from './_component/UploadButton';
import useGetDetailProductAdmin from '~/hooks/products/Queries/useGetDetailProductAdmin';
import { handleEditProduct } from './handleEditProduct';
import useUpdateProduct from '~/hooks/products/Mutations/useUpdateProduct';
import useUpdateProductVariant from '~/hooks/products/Mutations/useUpdateProductVariant';
import useCreateProductVariant from '~/hooks/products/Mutations/useCreateProductVariant';

const convertApiResponseToFileList = ({ url, urlRef, isArr }: { url: string; urlRef: string; isArr?: boolean }) => {
    if (!url) return [];

    if (isArr) return [{ name: 'image.png', uid: urlRef, status: 'done', url }];
    return {
        name: 'image.png',
        uid: urlRef,
        status: 'done',
        url,
    };
};
const customItemRender: UploadProps['itemRender'] = (originNode, file, fileList, actions) => {
    return (
        <div className='ant-upload-list-item ant-upload-list-item-undefined'>
            <img className='' src={file.thumbUrl || file.url} alt={file.name} />
            <span className='ant-upload-list-item-actions'>
                <span
                    onClick={actions.preview}
                    className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                >
                    <EyeOutlined />
                </span>
                <span
                    onClick={actions.remove}
                    className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                >
                    <DeleteOutlined />
                </span>
            </span>
        </div>
    );
};

const UpdateProduct = () => {
    const { id } = useParams();
    const { data } = useGetDetailProductAdmin(id as string);
    const productDetails = data?.data;
    const { mutate: updateProduct, isSuccess: isSuccessProduct, isPending } = useUpdateProduct();
    const { mutate: updateProductVariant, isSuccess: isSuccessVariantUpdate } = useUpdateProductVariant();
    const { mutate: createProductVariant, isSuccess: isSuccessVariantCreate } = useCreateProductVariant();

    // @preview images
    const [previewImagesOpen, setPreviewImagesOpen] = useState<boolean>(false);
    const [previewImages, setPreviewImages] = useState<string>('');
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');
    const navigate = useNavigate();
    // @images
    const [imagesfileList, setImagesFileList] = useState<UploadFile[]>([]);
    // @thumbnail
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    // @attributes images
    const [attributesFile, setAttributesFile] = useState<UploadFile[][]>([]);

    // @choose category
    const [categoryIdNew, setCategoryIdNew] = useState<string>('');

    // @get attributes
    const { data: attributesRes } = useGetAllAtributes(categoryIdNew || productDetails?.categoryId._id || '');
    const attributesForProduct = attributesRes?.data.productAttributes.attributeIds;
    const attributesForVariant = attributesRes?.data.variantAttribute.attributeIds;
    // @get category
    const [brandsRes, categoriesRes] = useGetCategoriesAndBrands();

    // @create product
    const [form] = Form.useForm<IProductForm>();

    // const firstElement = 0;
    const categories = categoriesRes.data?.data;
    const brands = brandsRes.data?.data;

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
        setCategoryIdNew(value);
    };

    const handleChangeImages: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setImagesFileList(newFileList);
        console.log(newFileList, imagesfileList);
    };
    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);

    const handleChangeAttributeThumbnail = (index: number): UploadProps['onChange'] => {
        return ({ fileList: newFileList }) => {
            const newAttributesFile = [...attributesFile];
            newAttributesFile[index] = [...newAttributesFile[index], ...newFileList];
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
            setImagesFileList(imagesConvert);
            setThumbnailFile(thumbnailConvert);
            const attConvert = attributes.reduce((acc: { [key: string]: any }, { key, value }: any) => {
                acc[key] = value;
                return acc;
            }, {});
            const variaConverts = variationIds.map((varia, i) => {
                let variantAttributes;
                if (varia.variantAttributes) {
                    console.log(varia, 'oooooooooooooo');
                    variantAttributes = varia.variantAttributes.reduce(
                        (acc: { [key: string]: any }, { key, value }: any) => {
                            acc[key] = value;
                            return acc;
                        },
                        {}
                    );
                }
                const image = convertApiResponseToFileList({
                    url: varia.image!,
                    urlRef: varia.imageUrlRef,
                    isArr: true,
                }) as UploadFile<any>[];
                const newAttributesFile = [...attributesFile];
                newAttributesFile[i] = image;
                setAttributesFile(newAttributesFile);

                const newVaria = { ...varia, variantAttributes, thumbnail: image };
                delete newVaria.image;
                return newVaria;
            });

            const initialValues: any = {
                images: imagesConvert,
                thumbnail: thumbnailConvert,
                attributes: attConvert,
                categoryId: categoryId._id,
                variations: variaConverts,
                brandId: brandId._id,
                ...rest,
            };
            if (categoryIdNew !== productDetails.categoryId._id) {
                initialValues.variations = '';
                initialValues.attributes = '';
                initialValues.categoryId = categoryIdNew;
                setAttributesFile([]);
            }
            console.log(initialValues);
            form.setFieldsValue(initialValues as any);
        }
    }, [productDetails, categoryIdNew]);

    useEffect(() => {
        if (isSuccessProduct || isSuccessVariantUpdate || isSuccessVariantCreate) {
            showMessage('Update product is successfully', 'success');
            navigate('/admin/products');
        }
    }, [isSuccessProduct, isSuccessVariantUpdate, isSuccessVariantCreate, navigate]);
    return (
        <div className='mx-6 rounded-lg bg-white px-4 py-6'>
            <div className='m-auto'>
                {productDetails && (
                    <Form layout='vertical' form={form} onFinish={onFinish} autoComplete='off'>
                        <Form.Item className='flex justify-end'>
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
                            <Link to='/admin/products' className='mr-3 px-5'>
                                Back to list
                            </Link>
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
                                            itemRender={customItemRender}
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
                                            itemRender={customItemRender}
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
                                                                    attributesFile={attributesFile}
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
                        <div className='my-2 flex justify-end'>
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
                        </div>
                        {/* <div className='my-2 flex justify-end'>
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
                        </div> */}
                    </Form>
                )}
            </div>
        </div>
    );
};
export default UpdateProduct;
