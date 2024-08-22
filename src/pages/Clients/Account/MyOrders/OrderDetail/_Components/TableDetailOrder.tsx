import { useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Table, Tooltip } from 'antd';
import { TableProps } from 'antd/lib';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { QUERY_KEY } from '~/constants/queryKey';
import { MAIN_ROUTES } from '~/constants/router';
import useDisabledReview from '~/hooks/orders/Mutations/useDisableReview';
import useGetDetailProductReview from '~/hooks/products/Queries/useGetDetailProductReview';
import RateBtn from '~/pages/Clients/Account/MyOrders/Components/RateBtn';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { Currency } from '~/utils';
import showMessage from '~/utils/ShowMessage';

interface DataType {
    key: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
    total?: number;
    isReviewed: boolean;
    productVariationId: string;
    isReviewDisabled: boolean;
}

interface Props {
    orderItems: DataType[];
    status: string;
}

const TableDetailOrder = ({ orderItems, status }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { mutateAsync, data: responseData, isPending } = useDisabledReview();
    const isReviewable = responseData?.data.data.isReviewable;

    const handleRateProduct = async (productId: string, orderId: string, productVariationId: string) => {
        // call api to check if product is deleted or hided
        mutateAsync({ orderId, productVariationId, productId });
        if (isReviewable) {
            // if passed
            dispatch(setReviewData({ orderId, isOpen: false }));
            navigate(`${MAIN_ROUTES.PRODUCTS}/${productId}`);
        }
    };
    const data: DataType[] = orderItems.map((item, index) => ({
        key: index,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
        isReviewed: item.isReviewed,
        productVariationId: item.productVariationId,
        isReviewDisabled: item.isReviewDisabled,
    }));

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (key) => <p>{key + 1}</p>,
            width: '5%',
        },
        {
            title: 'Ảnh Sản Phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt='product' className='h-20 w-20 object-cover' />,
            width: '15%',
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <>
                    <Flex justify='center' align='center'>
                        <Tooltip title='Xem chi tiết sản phẩm'>
                            <Link to={`/products/${record.productId}`}>
                                <h3>{record.name}</h3>
                            </Link>
                        </Tooltip>
                    </Flex>
                </>
            ),
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <p>{Currency.format(price)}</p>,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => <p>{quantity}</p>,
            width: '10%',
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => <p>{Currency.format(record.price * record.quantity)}</p>,
        },
        ...(status === 'done'
            ? [
                  {
                      title: 'Đánh giá',
                      key: 'action',
                      render: (_: number, record: DataType) => {
                          return (
                              <>
                                  {!record.isReviewDisabled && (
                                      <>
                                          {' '}
                                          {!record.isReviewed && (
                                              <Tooltip title='Đánh giá sản phẩm'>
                                                  <RateBtn
                                                      handleRate={handleRateProduct}
                                                      productId={record.productId}
                                                      orderId={id!}
                                                      productVariationId={record.productVariationId}
                                                      isLoading={isPending}
                                                  />
                                              </Tooltip>
                                          )}
                                          {record.isReviewed && (
                                              <Tooltip title='Sản phẩm đã được đánh giá'>
                                                  <Button type='default' disabled>
                                                      Đã đánh giá
                                                  </Button>
                                              </Tooltip>
                                          )}
                                      </>
                                  )}
                                  {record.isReviewDisabled && (
                                      <Tooltip title='Sản phẩm này đã bị ẩn hoặc xóa'>
                                          <Button type='default' disabled>
                                              Vô hiệu hóa
                                          </Button>
                                      </Tooltip>
                                  )}
                              </>
                          );
                      },
                  },
              ]
            : []),
    ];

    return <Table className='mt-5 w-full' columns={columns} dataSource={data} pagination={false} />;
};

export default TableDetailOrder;
