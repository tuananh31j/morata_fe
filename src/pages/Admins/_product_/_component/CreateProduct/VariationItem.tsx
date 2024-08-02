import { DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Space, Upload, UploadFile, UploadProps } from 'antd';
import { FormInstance } from 'antd/lib';
import { IAttributesValue } from '~/types/Attributes';
import { IProductForm } from '~/types/Product';
import {
    variationsColorValidator,
    variationsPriceValidator,
    variationsStockValidator,
    variationsThumbnailValidator,
} from '~/validation/Products/validators';

type IVariationsItem = {
    fieldName: number;
    index: number;
    restField: {
        fieldKey?: number;
    };
    attributesForVariant: IAttributesValue[] | undefined;
    attributesFile: UploadFile[][];
    id?: string;
    handleChangeThumbnail: (index: number) => UploadProps['onChange'];
    handleRemoveThumbnail: (index: number) => void;
    removeVariation: (name: number) => void;
};
const customItemRender: UploadProps['itemRender'] = (originNode, file, fileList, actions) => {
    return (
        <div className='ant-upload-list-item ant-upload-list-item-undefined mt-8 h-8 w-8'>
            <img className='' src={file.thumbUrl || file.url} alt={file.name} />
            <span className='ant-upload-list-item-actions'>
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

const VariationItem = ({
    fieldName,
    index,
    restField,
    attributesFile,
    attributesForVariant,
    id,
    handleChangeThumbnail,
    handleRemoveThumbnail,
    removeVariation,
}: IVariationsItem) => {
    console.log(attributesFile[index], '.........................');
    return (
        <>
            {attributesForVariant && (
                <Space align='center' className='flex items-center'>
                    <Form.Item {...restField} name={[fieldName, '_id']} dependencies={['_id']}>
                        <InputNumber className='hidden' />
                    </Form.Item>
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
                            itemRender={customItemRender}
                            beforeUpload={() => false}
                            listType='picture'
                            fileList={attributesFile[index]}
                            onChange={handleChangeThumbnail(index)}
                            maxCount={1}
                        >
                            {attributesFile[index]?.length >= 1 ? null : (
                                <Button className='border-none bg-stone-50 outline-none'>Upload</Button>
                            )}
                            {/* {!fileList && <Button className='border-none bg-stone-50 outline-none'>Upload</Button>} */}
                        </Upload>
                    </Form.Item>
                    {attributesForVariant.map((attribute, ii) => (
                        <Form.Item
                            key={attribute._id}
                            name={[fieldName, 'variantAttributes', attribute.attributeKey]}
                            label={attribute.name}
                            required={attribute.isRequired}
                            rules={[
                                {
                                    required: attribute.isRequired,
                                    message: 'Please input your attribute!',
                                },
                            ]}
                        >
                            {attribute.type === 'options' && (
                                <Select placeholder='Please select'>
                                    {attribute.values.map((value, i) => (
                                        <Select.Option value={value} key={i}>
                                            {value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                            {attribute.type === 'manual' && <Input placeholder='Please input' />}
                        </Form.Item>
                    ))}

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
                    {!id && (
                        <MinusCircleOutlined
                            onClick={() => {
                                handleRemoveThumbnail(index);
                                removeVariation(fieldName);
                            }}
                            className='text-lg'
                        />
                    )}
                </Space>
            )}
        </>
    );
};

export default VariationItem;
