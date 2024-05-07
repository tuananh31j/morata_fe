import { Outlet } from 'react-router-dom';
import AccountSidebarLeft from '../Components/AccountSidebarLeft';
import useDocumentTitle from '~/hooks/useDocumentTitle';

const AccountLayout = () => {
    useDocumentTitle('Account');

    return (
        <div className='flex gap-4'>
            <AccountSidebarLeft />
            <Outlet />
        </div>
    );
};

export default AccountLayout;
