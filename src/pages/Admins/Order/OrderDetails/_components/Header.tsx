import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';

const Header = ({ lengthProduct }: { lengthProduct: number }) => {
    return (
        <div className='border-default-200 flex flex-wrap items-center gap-3 border-b p-6'>
            <h4 className='text-default-900 text-xl font-medium'>Order #202347</h4>
            <div className='flex flex-wrap items-center gap-3'>
                <i data-lucide='dot' />
                <h4 className='text-default-600 text-sm'>{lengthProduct} Products</h4>
            </div>
            <Link to={`${ADMIN_ROUTES.ORDERS}`} className='ms-auto text-base font-medium text-primary'>
                Back to List
            </Link>
        </div>
    );
};

export default Header;
