import { DeleteOutlined, PlusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import useMessage from '~/hooks/_common/useMessage';
import { IAttributeFormData } from '~/types/Category';

const CreateAttribute = () => {
    // const navigate = useNavigate();
    // const { mutate: createCategory, isPending } = useMutationCreateCategory();
    const { handleMessage, contextHolder } = useMessage();

    const attributeSchema = z.object({
        name: z.string({ message: 'Category name is required!' }),
        type: z.string({ message: 'Type is required!' }),
        values: z.array(z.string({ message: 'PLease enter a value' })),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IAttributeFormData>({
        resolver: zodResolver(attributeSchema),
    });

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: 'values',
    // });

    // console.log(fields);

    const onSubmit: SubmitHandler<IAttributeFormData> = async (body) => {
        console.log('onsubmit:', body);
        // createCategory(body);
        // navigate('/admin/category', { replace: true });

        // if (isPending) {
        //     handleMessage({ type: 'loading', content: '...Creating!' });
        // }
    };

    // const [options, setOptions] = useState([
    //     'Apple',
    //     'Pear',
    //     'Orange',
    //     'Banana',
    //     'Mango',
    //     'Strawberry',
    //     'Pineapple',
    //     'Watermelon',
    //     'Kiwi',
    // ]);

    // const [isFirstClick, setIsFirstClick] = useState(true);
    // console.log('from watch:', watch('newAttributes'));

    // const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    //     console.log('checked = ', checkedValues);
    // };

    return (
        <>
            {contextHolder}
            <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                <div className='m-auto'>
                    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
                        <div>
                            <div className='mx-auto w-[70%] rounded-lg border border-opacity-90 p-2 px-4'>
                                <h3 className='my-2 text-xl font-medium text-primary'>Create a new attribute</h3>
                                <Form.Item
                                    label='Attribute Name'
                                    className='font-medium text-[#08090F]'
                                    validateStatus={errors.name ? 'error' : ''}
                                    help={errors.name?.message}
                                >
                                    <Controller
                                        name='name'
                                        control={control}
                                        render={({ field }) => <Input {...field} size='large' />}
                                    />
                                </Form.Item>

                                {/* <Form.Item
                                    label='Select Attributes'
                                    className='font-medium text-[#08090F]'
                                    validateStatus={errors.attributeIds ? 'error' : ''}
                                    help={errors.attributeIds?.message}
                                    // validateStatus={errors.attributes ? 'error' : ''}
                                    // help={errors.attributes?.message}
                                >
                                    <Controller
                                        name={`attributeIds`}
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox.Group
                                                options={options}
                                                defaultValue={['Apple']}
                                                onChange={onChange}
                                                className='grid grid-cols-3 gap-2'
                                            />
                                        )}
                                    />
                                </Form.Item> */}

                                {/* <Form.Item
                                    label='Category Description'
                                    className='font-medium text-[#08090F]'
                                    validateStatus={errors.description ? 'error' : ''}
                                    help={errors.description?.message}
                                >
                                    <Controller
                                        name='description'
                                        control={control}
                                        render={({ field }) => <TextArea {...field} rows={4} className='w-full' />}
                                    />
                                </Form.Item> */}

                                {/* <Form.Item label='Create Attribute' className='font-medium text-[#08090F]'>
                                    <Controller
                                        name={`items[${index}].name`}
                                        control={control}
                                        defaultValue={item.name}
                                        render={({ field }) => <input {...field} />}
                                    />
                                </Form.Item> */}

                                {/* {fields.length > 0 &&
                                    fields.map((item, index) => (
                                        <Form.Item
                                            key={item.id}
                                            label='Add New Value'
                                            className='marker: mb-3 font-medium text-[#08090F]'
                                        >
                                            <div className='flex w-full justify-between'>
                                                <Controller
                                                    name={`values`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            className='w-[93%]'
                                                            placeholder='Enter value'
                                                        />
                                                    )}
                                                />

                                                <Button
                                                    danger
                                                    className='flex items-center'
                                                    onClick={() => remove(index)}
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </div>
                                        </Form.Item>
                                    ))} */}

                                {/* <Button
                                    type='primary'
                                    icon={<PlusCircleOutlined />}
                                    onClick={() => {
                                        if (isFirstClick) {
                                        append({ name: '', values: [] });
                                        setIsFirstClick(false);
                                        } else {
                                        const newAttribute = watch('attributes')[0].attribute || '';
                                        console.log(watch('attributes')[0].attribute);

                                        setOptions([...options, newAttribute]);
                                        }
                                    }}
                                >
                                    Add value
                                </Button> */}

                                <Form.Item className='flex justify-end'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        icon={<PlusSquareOutlined />}
                                        className='mr-3 px-5'
                                        size='large'
                                    >
                                        Add Attribute
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateAttribute;
