import { BookOutlined, DollarOutlined, ShoppingCartOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import StatsCard from '~/components/StatCard/StatCard';
import { Option } from '~/types/apexChart';
import { Currency } from '~/utils';

type DataType = {
    id?: string;
    name: string;
    thumbnail: string;
    category: string;
    sales: number;
    total: number;
};
const Dashboard = () => {
    const [areaChart, setAreaChart] = useState<Option>({
        series: [
            {
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41],
            },
        ],
        options: {
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    '2018-09-19',
                    '2018-09-20',
                    '2018-09-21',
                    '2018-09-22',
                    '2018-09-23',
                    '2018-09-24',
                    '2018-09-25',
                ],
                labels: {
                    style: {
                        colors: 'var(--text)',
                    },
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: 'var(--text)',
                    },
                },
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy',
                },
            },
            legend: {
                labels: {
                    colors: 'text-reverse',
                },
            },
        },
    });

    const [pieChart, setPieChart] = useState<Option>({
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                height: 350,
                type: 'donut',
            },
            legend: {
                labels: {
                    colors: 'text-reverse',
                },
            },
        },
    });

    useEffect(() => {
        setAreaChart({
            series: [
                {
                    name: 'series1',
                    data: [31, 40, 28, 51, 42, 109, 100],
                },
                {
                    name: 'series2',
                    data: [11, 32, 45, 32, 34, 52, 41],
                },
            ],
            options: {
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    type: 'datetime',
                    categories: [
                        '2018-09-19',
                        '2018-09-20',
                        '2018-09-21',
                        '2018-09-22',
                        '2018-09-23',
                        '2018-09-24',
                        '2018-09-25',
                    ],
                    labels: {
                        style: {
                            colors: 'var(--text)',
                        },
                    },
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: 'var(--text)',
                        },
                    },
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy',
                    },
                },
                legend: {
                    labels: {
                        colors: 'text-reverse',
                    },
                },
            },
        });

        setPieChart({
            series: [44, 55, 41, 17, 15],
            options: {
                chart: {
                    height: 350,
                    type: 'donut',
                },
                legend: {
                    labels: {
                        colors: 'text-reverse',
                    },
                },
            },
        });
    }, []);
    const newSeries = [
        {
            name: 'series1',
            data: [31, 40, 28, 23, 42, 109, 23],
        },
        {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41, 42],
        },
    ];
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <h4 className='text-base text-blue-400'>{text}</h4>,
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (url) => <img src={url} height={80} width={80} alt='thumbnail' />,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <Tag color='cyan'>{text}</Tag>,
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
        },
        {
            title: 'Earnings',
            dataIndex: 'total',
            key: 'total',
            render: (total) => <span>{Currency.format(total)}</span>,
        },
    ];
    const data: DataType[] = [
        {
            name: 'Food',
            thumbnail:
                'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            category: 'Food',
            sales: 100,
            total: 1000,
        },
    ];
    return (
        <div className='mx-6 mt-[7.5rem] sm:mt-[6.75rem]'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                <StatsCard
                    title="Today's Money"
                    amount='$53,000'
                    percentage={55}
                    since='since yesterday'
                    icon={<DollarOutlined className='text-white' />}
                    bgColor='bg-gradient-to-tl from-blue-500 to-violet-500'
                />
                <StatsCard
                    title="Today's Users"
                    amount='+2,300'
                    percentage={3}
                    since='since last week'
                    icon={<UserAddOutlined className='text-white' />}
                    bgColor='bg-gradient-to-tl from-red-600 to-orange-600'
                />
                <StatsCard
                    title='New Clients'
                    amount='+3,462'
                    percentage={-2}
                    since='since last quarter'
                    icon={<BookOutlined className='text-white' />}
                    bgColor='bg-gradient-to-tl from-emerald-500 to-teal-400'
                />
                <StatsCard
                    title='Sales'
                    amount='$103,430'
                    percentage={5}
                    since='than last month'
                    icon={<ShoppingCartOutlined className='text-white' />}
                    bgColor='bg-gradient-to-tl from-orange-500 to-yellow-500'
                />
            </div>
            <div className='my-6 grid grid-cols-1 justify-between gap-3 lg:grid-cols-[58%,40%]'>
                <div className='rounded-3xl bg-white p-2'>
                    <Button
                        onClick={() => {
                            setAreaChart({
                                ...areaChart,
                                series: [...newSeries],
                            });
                        }}
                    >
                        Click me
                    </Button>
                    <ReactApexChart options={areaChart.options} series={areaChart.series} height={350} type='area' />
                </div>
                <div className='flex items-center justify-center rounded-3xl bg-white p-2'>
                    <div className='flex-grow'>
                        <ReactApexChart options={pieChart.options} series={pieChart.series} height={350} type='donut' />
                    </div>
                </div>
            </div>
            <div className='mt-2 rounded-xl bg-white p-2'>
                <h3 className='my-4 ml-2 text-2xl font-medium'>Top products sale</h3>
                <Table size='small' columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Dashboard;
