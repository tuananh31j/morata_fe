import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Pagination, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import moment from 'moment';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { TableProps } from 'antd/lib';
import { ORDER_STATUS } from '~/constants/order';

interface Props {
    ordersList: {
        _id: string;
        totalPrice: number;
        paymentMethod: string;
        isPaid: boolean;
        createdAt: string;
    }[];
    totalDocs: number;
    totalPages: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

interface DataType {
    key: number;
    code: string;
    total: number;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
}

type DataIndex = keyof DataType;

const OrderTable = ({ ordersList, totalDocs, setCurrentPage }: Props) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const dataSource =
        ordersList && ordersList.length
            ? ordersList.map((order: any, index) => {
                  return {
                      key: index,
                      code: order._id,
                      total: order.totalPrice,
                      paymentMethod: order.paymentMethod,
                      paymentStatus: order.isPaid ? 'Paid' : 'Unpaid',
                      orderStatus: order.orderStatus,
                      createdAt: order.createdAt,
                  };
              })
            : [];

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<DataType> = [
        {
            key: 'Code',
            dataIndex: 'code',
            title: 'Mã đơn hàng',
            ...getColumnSearchProps('code'),
            ellipsis: true,
        },
        {
            key: 'total',
            dataIndex: 'total',
            title: 'Tổng tiền',
            sorter: (a: any, b: any) => a.total - b.total,
            sortDirections: ['descend'],
        },
        {
            key: 'paymentStatus',
            dataIndex: 'paymentStatus',
            title: 'Trạng thái thanh toán',
            render: (text: string) => {
                if (text === 'Unpaid') {
                    return <span className='font-semibold text-red'>Chưa thanh toán</span>;
                }

                return <span className='font-semibold text-green-500'>Đã thanh toán</span>;
            },
            filters: [
                { text: 'Đã thanh toán', value: 'Paid' },
                { text: 'Chưa thanh toán', value: 'Unpaid' },
            ],
            onFilter: (value: any, record: any) => record.paymentStatus?.indexOf(value) === 0,
        },
        {
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            title: 'Trạng thái đơn hàng',
            render: (text: string) => {
                if (text === ORDER_STATUS.CANCELLED) {
                    return <span className='font-semibold text-red'>Đã hủy</span>;
                } else if (text === ORDER_STATUS.CONFIRMED) {
                    return <span className='font-semibold text-blue-500'>Đã xác nhận</span>;
                } else if (text === ORDER_STATUS.SHIPPING) {
                    return <span className='font-semibold text-green-500'>Đang giao</span>;
                } else if (text === ORDER_STATUS.DELIVERED) {
                    return <span className='font-semibold text-green-500'>Đã giao</span>;
                } else if (text === ORDER_STATUS.DONE) {
                    return <span className='font-semibold text-green-500'>Hoàn thành</span>;
                }

                return <span className='font-semibold text-yellow-500'>Chờ xác nhận</span>;
            },
            filters: [
                { text: 'Chờ Xác nhận', value: 'pending' },
                { text: 'Đã xác nhận', value: 'confirmed' },
                { text: 'Đang giao', value: 'shipping' },
                { text: 'Đã giao', value: 'delivered' },
                { text: 'Hoàn thành', value: 'done' },
                { text: 'Đã hủy', value: 'cancelled' },
            ],
            onFilter: (value: any, record: any) => record.orderStatus?.indexOf(value) === 0,
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày đặt hàng',
            render: (text: string) => {
                return moment(text).format('DD/MM/YYYY hh:mm:ss');
            },
            sorter: (a: any, b: any) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            key: 'action',
            title: 'Thao tác',
            render: (text, record) => {
                return (
                    <Link to={`/admin/orders/${record.code}/detail`}>
                        <Button type='primary'>Xem chi tiết</Button>
                    </Link>
                );
            },
        },
    ];

    const onSelectPaginateChange = (page: number) => {
        setCurrentPage(page);
    };
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log(pagination, 'pag', filters, 'fil', sorter, 'sort', extra);
    };
    return (
        <>
            <Table
                onChange={onChange}
                className='mt-5 w-full'
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
            <Space className='mt-5 flex w-full justify-end'>
                <Pagination onChange={onSelectPaginateChange} pageSize={10} total={totalDocs} />
            </Space>
        </>
    );
};
export default OrderTable;
