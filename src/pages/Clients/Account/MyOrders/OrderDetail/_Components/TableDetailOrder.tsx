import { Button, Flex, Table, Tooltip } from 'antd';
import { TableProps } from 'antd/lib';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import useDisabledReview from '~/hooks/orders/Mutations/useDisableReview';
import RateBtn from '~/pages/Clients/Account/MyOrders/Components/RateBtn';
import { setReviewData } from '~/store/slice/rateProductSlice';
import { IAttributeItem } from '~/types/Product';
import { Currency } from '~/utils';

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
    variant: {
        variantAttributes: { name: string; key: string; value: string }[];
    };
}

interface Props {
    orderItems: DataType[];
    status: string;
}

const TableDetailOrder = ({ orderItems, status }: Props) => {
    const { id } = useParams();
    const { mutateAsync, isPending } = useDisabledReview();
    const handleRateProduct = async (productId: string, orderId: string, productVariationId: string) => {
        mutateAsync({ orderId, productVariationId, productId });
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
        variant: item.variant,
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
            render: (_, record) => (
                <Link to={`/products/${record.productId}`}>
                    <img src={record.image} alt='product' className='h-20 w-20 object-cover' />
                </Link>
            ),
            width: '15%',
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                // const { data } = useGetVariantDetail();
                return (
                    <>
                        <Flex justify='center' align='center'>
                            <Tooltip title='Xem chi tiết sản phẩm'>
                                <Link to={`/products/${record.productId}`}>
                                    <h3>{record.name}</h3>
                                </Link>
                            </Tooltip>
                        </Flex>
                    </>
                );
            },
            width: '20%',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'variant',
            key: 'variant',
            render: (variant) => {
                return (
                    <>
                        {variant ? (
                            <div className='flex gap-2'>
                                {variant.variantAttributes.map((item: any, i: number) => (
                                    <span key={i} className='text-xs'>
                                        {item.value}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            'Không có thông tin'
                        )}
                    </>
                );
            },
            width: '30%',
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
                                                      isPending={isPending}
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
                                              Đánh giá
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
