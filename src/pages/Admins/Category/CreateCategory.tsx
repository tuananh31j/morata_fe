import { PlusSquareOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import useMessage from '~/hooks/_common/useMessage';
import { useMutationCreateCategory } from '~/hooks/categories/Mutations/useCreateCategory';
import { ICategoryFormData } from '~/types/Category';

const CreateCategory = () => {
    const navigate = useNavigate();
    const { mutate: createCategory, isPending } = useMutationCreateCategory();
    const { handleMessage, contextHolder } = useMessage();

    const categorySchema = z.object({
        name: z.string({ message: 'Category name is required!' }),
        description: z.string({ message: 'Category description is required!' }),
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ICategoryFormData>({
        resolver: zodResolver(categorySchema),
    });

    const onSubmit: SubmitHandler<ICategoryFormData> = async (body) => {
        createCategory(body);
        navigate('/admin/category', { replace: true });

        if (isPending) {
            handleMessage({ type: 'loading', content: '...Creating!' });
        }
    };

    return (
        <>
            {contextHolder}
            <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                <div className='m-auto'>
                    <Form layout='vertical' onFinish={handleSubmit(onSubmit)}>
                        <div>
                            <div className='mx-auto w-[70%] rounded-lg border border-opacity-90 p-2 px-4'>
                                <h3 className='my-2 text-lg font-medium text-[#08090F]'>Create a new category</h3>

                                <Form.Item
                                    label='Category Name'
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

                                <Form.Item
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
                                </Form.Item>

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
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;
