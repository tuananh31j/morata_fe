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
import { useState } from 'react';

type FieldType = {
    name: string;
    price: number;
    category: string;
    brand: string;
    images: string[];
    thumbnail: string;
    discount: number;
    stock: number;
    description: string;
    sku: number;
};
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const handleChangeCat = (value: string) => {
    console.log(`selected ${value}`);
};
const handleChangeBrand = (value: string) => {
    console.log(`selected ${value}`);
};
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const CreateProduct = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewThumbnalOpen, setPreviewThumbnalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewThumbnail, setPreviewThumbnail] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <div className='mx-6 rounded-lg bg-white px-4 py-6'>
            <div className='m-auto'>
                <Form layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                            <h3 className='my-2 text-lg font-medium text-[#08090F]'>General information</h3>
                            <Form.Item<FieldType>
                                label='Product Name'
                                name='name'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input size='large' />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label='Product Description'
                                name='description'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please input your description!' }]}
                            >
                                <TextArea rows={4} className='w-full' />
                            </Form.Item>
                        </div>
                        <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                            <h3 className='my-2 text-lg font-medium text-[#08090F]'>Pricing</h3>
                            <Form.Item<FieldType>
                                className='font-medium text-[#08090F]'
                                label='Product Price'
                                name='price'
                                rules={[{ required: true, message: 'Please input your price!' }]}
                            >
                                <InputNumber prefix={<DollarOutlined />} size='large' className='w-full' />
                            </Form.Item>
                            <Form.Item<FieldType>
                                className='font-medium text-[#08090F]'
                                label='Product Stock'
                                name='stock'
                                rules={[{ required: true, message: 'Please input your stock!' }]}
                            >
                                <InputNumber size='large' className='w-full' />
                            </Form.Item>
                        </div>
                        <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                            <h3 className='my-2 text-lg font-medium text-[#08090F]'>Product Media</h3>
                            <Form.Item<FieldType>
                                label='Product Images'
                                name='images'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please input your images!' }]}
                            >
                                <Upload
                                    action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                                    listType='picture-card'
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    maxCount={5}
                                    multiple
                                >
                                    {fileList.length >= 5 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
                                />
                            )}
                            <Form.Item<FieldType>
                                label='Product Thumbnail'
                                name='thumbnail'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please input your thumbnail!' }]}
                            >
                                <Upload
                                    action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                                    listType='picture-card'
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    maxCount={1}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) => setPreviewOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                    }}
                                    src={previewImage}
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
                            <Form.Item<FieldType>
                                label='Product Category'
                                name='category'
                                className='font-medium text-[#08090F]'
                                initialValue={'lucy'}
                                rules={[{ required: true, message: 'Please input your category!' }]}
                            >
                                <Select
                                    size='large'
                                    onChange={handleChangeCat}
                                    className='w-full'
                                    options={[
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        { value: 'Yiminghe', label: 'yiminghe' },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label='Product Brand'
                                name='brand'
                                initialValue={'lucy'}
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please input your brand!' }]}
                            >
                                <Select
                                    size='large'
                                    onChange={handleChangeBrand}
                                    className='w-full'
                                    options={[
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        { value: 'Yiminghe', label: 'yiminghe' },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className='rounded-lg border border-opacity-90 p-2 px-4'>
                            <h3 className='my-2 text-lg font-medium text-[#08090F]'>Inventory </h3>
                            <div className='grid grid-cols-3 gap-2'>
                                <Form.Item<FieldType>
                                    className='font-medium text-[#08090F]'
                                    label='Product Sku'
                                    name='sku'
                                    rules={[{ required: true, message: 'Please input your sku!' }]}
                                >
                                    <InputNumber size='large' className='w-full' />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    className='font-medium text-[#08090F]'
                                    label='Product Discount'
                                    name='discount'
                                    rules={[{ required: true, message: 'Please input your discount!' }]}
                                >
                                    <InputNumber size='large' className='w-full' />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default CreateProduct;
