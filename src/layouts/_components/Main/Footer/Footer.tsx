import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';

const Footer = () => {
    const [_, data] = useGetCategoriesAndBrands();
    const categories = data?.data?.data;

    return (
        <footer className='mt-5 bg-[#1f2024]'>
            <div className='mx-3 lg:mx-4'>
                <div className='mt-[50px] flex justify-center py-[40px]'>
                    <div className='flex flex-col'>
                        <ul className='flex flex-wrap justify-center gap-[15px] text-[12px] text-[#999999]'>
                            {categories?.map((category) => (
                                <div key={category._id}>
                                    <Link to={`/products?categoryId=${category._id}`}>
                                        <span className='text-sm capitalize hover:text-white'>{category.name}</span>
                                    </Link>

                                    <Divider type='vertical' />
                                </div>
                            ))}

                            <Link to='/contact'>
                                <span className='text-sm capitalize hover:text-white'>Contact us</span>
                            </Link>
                        </ul>

                        <div className='flex justify-center py-[15px] '></div>

                        <p className='text-center text-[16px] text-[#999999]'>
                            Copyright @ <span className='font-semibold text-cyan-500'>Morata</span>. All Rights
                            Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
