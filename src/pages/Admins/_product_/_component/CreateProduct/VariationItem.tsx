import { CloseOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Space, Upload, UploadFile, UploadProps } from 'antd';
import {
    variationsColorValidator,
    variationsPriceValidator,
    variationsStockValidator,
    variationsStorageValidator,
    variationsThumbnailValidator,
} from '~/validation/Products/validators';

type IVariationsItem = {
    fieldName: number;
    index: number;
    restField: {
        fieldKey?: number;
    };
    attributesFile: UploadFile[][];
    handleChangeThumbnail: (index: number) => UploadProps['onChange'];
    handleRemoveThumbnail: (index: number) => void;
    removeVariation: (name: number) => void;
};

const VariationItem = ({
    fieldName,
    index,
    restField,
    attributesFile,
    handleChangeThumbnail,
    handleRemoveThumbnail,
    removeVariation,
}: IVariationsItem) => {
    return (
        <Space align='center' className='flex justify-between gap-4'>
            <Form.Item
                {...restField}
                name={[fieldName, 'thumbnail']}
                rules={[
                    {
                        validator: variationsThumbnailValidator,
                    },
                ]}
                dependencies={['thumbnail']}
            >
                <Upload
                    beforeUpload={() => false}
                    listType='picture'
                    fileList={attributesFile[index]}
                    onChange={handleChangeThumbnail(index)}
                    maxCount={1}
                >
                    {attributesFile[index]?.length >= 1 ? null : (
                        <Button className='border-none bg-stone-50 outline-none'>Upload</Button>
                    )}
                </Upload>
            </Form.Item>
            {/* <Form.Item>
                <Form.List name={[fieldName, 'variationsName']}>
                    {(subFields, subOpt) => (
                        <div>
                            {subFields.map((subField) => (
                                <Space key={subField.key}>
                                    <Form.Item noStyle name={[subField.name, 'variationName']}>
                                        <Input placeholder='Variantion name' />
                                    </Form.Item>
                                    <CloseOutlined
                                        onClick={() => {
                                            subOpt.remove(subField.name);
                                        }}
                                    />
                                </Space>
                            ))}
                            <Button type='dashed' onClick={() => subOpt.add()} block>
                                + Add Sub Item
                            </Button>
                        </div>
                    )}
                </Form.List>
            </Form.Item> */}
            <Form.Item
                {...restField}
                name={[fieldName, 'color']}
                label='Color'
                dependencies={['color']}
                rules={[variationsColorValidator()]}
            >
                <Input placeholder='Color' className='w-full' />
            </Form.Item>
            <Form.Item
                {...restField}
                name={[fieldName, 'storage']}
                label='Storage'
                dependencies={['storage']}
                rules={[variationsStorageValidator()]}
            >
                <InputNumber placeholder='storage' min={32} className='w-full' />
            </Form.Item>
            <Form.Item
                {...restField}
                name={[fieldName, 'price']}
                label='Price'
                dependencies={['price']}
                rules={[variationsPriceValidator()]}
            >
                <InputNumber placeholder='Price' className='w-full' />
            </Form.Item>
            <Form.Item
                {...restField}
                name={[fieldName, 'stock']}
                label='stock'
                dependencies={['stock']}
                rules={[variationsStockValidator()]}
            >
                <InputNumber placeholder='Stock' className='w-full' />
            </Form.Item>
            <MinusCircleOutlined
                onClick={() => {
                    handleRemoveThumbnail(index);
                    removeVariation(fieldName);
                }}
                className='text-lg'
            />
        </Space>
    );
};

export default VariationItem;
