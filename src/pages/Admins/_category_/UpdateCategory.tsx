import { PlusSquareOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';
import { SubmitHandler, useForm, Controller, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import useMessage from '~/hooks/_common/useMessage';
import { useMutationUpdateCategory } from '~/hooks/categories/Mutations/useUpdateCategory';
import useGetDetailCategory from '~/hooks/categories/Queries/useGetDetailCategory';
import { ICategoryFormData } from '~/types/Category';

const UpdateCategory = () => {
    const params = useParams();
    const id = String(params.id);
    const navigate = useNavigate();

    const { data } = useGetDetailCategory(id);
    const categoryDetails = data?.data;

    const { mutate: updateCategory, isPending } = useMutationUpdateCategory();
    const { handleMessage, contextHolder } = useMessage();

    const categorySchema = z.object({
        name: z.string({ message: 'Category name is required!' }),
        description: z.string({ message: 'Category description is required!' }),
    });

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ICategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: categoryDetails?.name,
            description: categoryDetails?.description,
        },
    });

    useEffect(() => {
        reset({
            name: categoryDetails?.name,
            description: categoryDetails?.description,
        });
    }, [reset, categoryDetails]);

    const onSubmit: SubmitHandler<ICategoryFormData> = async (body) => {
        console.log(body);
        updateCategory({ id, payload: body });
        navigate('/admin/categories', { replace: true });

        if (isPending) {
            handleMessage({ type: 'loading', content: '...Updating!' });
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
                                <h3 className='my-2 text-lg font-medium text-[#08090F]'>
                                    Update category with ID: <span className='text-[#1677FF]'>{id}</span>
                                </h3>

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
                                        Update
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

export default UpdateCategory;
