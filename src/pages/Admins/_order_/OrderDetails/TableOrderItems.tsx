import { Table } from 'antd';
import { TableProps } from 'antd/lib';

interface DataType {
    key: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
    productId: string;
    total?: number;
}

interface Props {
    orderItems: DataType[];
}

const TableOrderItems = ({ orderItems }: Props) => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (key) => <p>{key + 1}</p>,
        },
        {
            title: 'Ảnh Sản Phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt='product' className='h-20 w-20 object-cover' />,
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <p>{price}</p>,
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity) => <p>{quantity}</p>,
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => <p>{record.price * record.quantity}</p>,
        },
    ];

    const data: DataType[] = orderItems.map((item, index) => ({
        key: index,
        image: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
    }));

    return <Table className='mt-5 w-full' columns={columns} dataSource={data} pagination={false} />;
};

export default TableOrderItems;
