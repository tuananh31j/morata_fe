import { EditOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Button, Card, Col, Layout, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductItemsCheckout from './ProductItemsCheckout';
import ReceiverCheckoutInfo from './ReceiverCheckoutInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import useCalculateFee from '~/hooks/shipping/useCalculateFee';
import { setShippingFee } from '~/store/slice/orderSlice';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';

const { Content } = Layout;
const { Title } = Typography;

const Checkout: React.FC = () => {
    useDocumentTitle('Thanh toán đơn hàng');

    const { shippingAddress } = useSelector((state: RootState) => state.order);
    const { serviceId, districtId, wardCode } = shippingAddress;
    const { data: shippingFee } = useCalculateFee({ serviceId, wardCode, districtId });
    const dispatch = useDispatch();

    useEffect(() => {
        if (shippingFee) {
            dispatch(setShippingFee(shippingFee.total));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shippingFee]);

    return (
        <Layout className='bg-gray-100 min-h-screen'>
            <Content className='px-4 py-6 sm:px-6 sm:py-12 lg:px-8'>
                <div className='mx-auto max-w-7xl'>
                    <div className='mb-6 flex flex-col items-start justify-between sm:mb-8 sm:flex-row sm:items-center'>
                        <Title level={2} className='m-0 mb-4 sm:mb-0'>
                            <ShoppingOutlined className='mr-3' />
                            Thanh toán đơn hàng
                        </Title>
                        <Link to='/shipping' className='w-full sm:w-auto'>
                            <Button
                                type='primary'
                                icon={<EditOutlined />}
                                size='large'
                                className='h-10 w-full px-6 font-semibold sm:w-auto'
                            >
                                Cập nhật thông tin giao hàng
                            </Button>
                        </Link>
                    </div>

                    <Row gutter={[16, 16]}>
                        <Col xs={24} lg={15}>
                            <Card
                                className='shadow-md transition-shadow duration-300 hover:shadow-lg'
                                title={<Title level={4}>Thông tin đơn hàng</Title>}
                            >
                                <ReceiverCheckoutInfo />
                            </Card>
                        </Col>
                        <Col xs={24} lg={9}>
                            <Card
                                className='shadow-md transition-shadow duration-300 hover:shadow-lg lg:sticky lg:top-1'
                                title={<Title level={4}>Chi tiết thanh toán</Title>}
                            >
                                <ProductItemsCheckout />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};

export default Checkout;
