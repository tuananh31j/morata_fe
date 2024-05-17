import { Outlet } from 'react-router-dom';
import AccountSidebarLeft from '../Components/AccountSidebarLeft';
import useDocumentTitle from '~/hooks/useDocumentTitle';
import { Col, Row } from 'antd';

const AccountLayout = () => {
    useDocumentTitle('Account');

    return (
        <Row justify='space-between'>
            <Col span={6} className='hidden md:block'>
                <AccountSidebarLeft />
            </Col>
            <Col span={17}>
                <Outlet />
            </Col>
        </Row>
    );
};

export default AccountLayout;
