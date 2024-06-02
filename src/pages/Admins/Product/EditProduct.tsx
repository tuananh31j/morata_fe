import { PlusOutlined } from '@ant-design/icons';
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
const EditProduct = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
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
            <div className='m-auto w-[40vw]'>
                <Form layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
                    <Form.Item<FieldType>
                        label='Product name'
                        name='name'
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label='Product price'
                        name='price'
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <InputNumber className='w-full' />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label='Product stock'
                        name='stock'
                        rules={[{ required: true, message: 'Please input your stock!' }]}
                    >
                        <InputNumber className='w-full' />
                    </Form.Item>
                    <div className='grid grid-cols-2 gap-2'>
                        <Form.Item<FieldType>
                            label='Product category'
                            name='category'
                            initialValue={'lucy'}
                            rules={[{ required: true, message: 'Please input your category!' }]}
                        >
                            <Select
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
                            label='Product brand'
                            name='brand'
                            initialValue={'lucy'}
                            rules={[{ required: true, message: 'Please input your brand!' }]}
                        >
                            <Select
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
                    <Form.Item<FieldType>
                        label='Product images'
                        name='images'
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
                        label='Product thumbnail'
                        name='thumbnail'
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
                    <Form.Item<FieldType>
                        label='Product description'
                        name='description'
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <TextArea rows={4} className='w-full' />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='px-5'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default EditProduct;
