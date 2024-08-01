import { useRef, useState } from 'react';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Pagination, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';

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

const OrderTable = ({ ordersList, totalDocs, totalPages, setCurrentPage }: Props) => {
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
            title: 'Code',
            ...getColumnSearchProps('code'), // Pass 'code' as argument
        },
        {
            key: 'total',
            dataIndex: 'total',
            title: 'Total',
            sorter: (a: any, b: any) => a.total - b.total,
            sortDirections: ['descend'],
        },
        {
            key: 'paymentMethod',
            dataIndex: 'paymentMethod',
            title: 'Payment Method',
            render: (text: string) => <span className='font-semibold'>{text.toUpperCase()}</span>,
            filters: [
                { text: 'cash', value: 'cash' },
                { text: 'card', value: 'card' },
            ],
            onFilter: (value: any, record: any) => record.paymentMethod.indexOf(value) === 0,
        },
        {
            key: 'paymentStatus',
            dataIndex: 'paymentStatus',
            title: 'Payment Status',
            filters: [
                { text: 'Paid', value: 'Paid' },
                { text: 'Unpaid', value: 'Unpaid' },
            ],
            onFilter: (value: any, record: any) => record.paymentStatus?.indexOf(value) === 0,
        },
        {
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            title: 'Order Status',
            render: (text: string) => <span className='font-semibold'>{text?.toUpperCase()}</span>,
            sorter: (a: any, b: any) => a.length - b.length,
            sortDirections: ['descend'],
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Created At',
            render: (text: string) => {
                return moment(text).format('DD/MM/YYYY hh:mm:ss');
            },
            sorter: (a: any, b: any) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
            sortDirections: ['descend', 'ascend'],
        },
        {
            key: 'action',
            title: 'Action',
            render: (text, record) => {
                return (
                    <Link to={`/admin/orders/${record.code}/detail`}>
                        <Button type='primary'>View</Button>
                    </Link>
                );
            },
        },
    ];

    const onSelectPaginateChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Table className='mt-5 w-full' columns={columns} dataSource={dataSource} pagination={false} />
            <Space className='mt-5 flex w-full justify-end'>
                <Pagination onChange={onSelectPaginateChange} pageSize={10} total={totalDocs} />
            </Space>
        </>
    );
};
export default OrderTable;
