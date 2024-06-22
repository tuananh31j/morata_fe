import { Outlet } from 'react-router-dom';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import { Col, Row } from 'antd';
import AccountSidebarLeft from '~/layouts/_components/User/AccountSidebarLeft';

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
