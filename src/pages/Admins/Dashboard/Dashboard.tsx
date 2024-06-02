import ReactApexChart from 'react-apexcharts';

const Dashboard = () => {
    const options: any = {
        series: [
            {
                name: 'series1',
                data: [31, 40, 28, 51, 54],
            },
            {
                name: 'series2',
                data: [2, 12, 45, 24, 32],
            },
            {
                name: 'series3',
                data: [11, 32, 23, 32, 85],
            },
        ],
        chart: {
            height: 350,
            type: 'area',
            toolbar: { show: true },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: ['2018-09-19T', '2018-09-20T', '2018-09-21T', '2018-09-22T', '2018-09-23T'],
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
    };
    return (
        <>
            {/* dark 051139 */}
            <div className='mx-6 w-[500px] rounded-2xl  bg-white'>
                <ReactApexChart options={options} series={options.series} type='area' height={350} />
            </div>
        </>
    );
};

export default Dashboard;
