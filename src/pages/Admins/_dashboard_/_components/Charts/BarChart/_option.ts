import { ApexOptions } from 'apexcharts';

interface BarChartConfig {
    timeline: string[];
    colors?: string[];
    height?: number;
    stacked?: boolean;
    fontFamily?: string;
    animated?: boolean;
}

export const BarChartOptions = ({
    timeline,
    colors = ['#3C50E0', '#80CAEE'],
    height = 350,
    stacked = true,
    fontFamily = 'Satoshi, sans-serif',
    animated = true,
}: BarChartConfig): ApexOptions => {
    return {
        colors,
        chart: {
            fontFamily,
            type: 'bar',
            height,
            stacked,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
            animations: {
                enabled: animated,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350,
                },
            },
        },
        responsive: [
            {
                breakpoint: 1536,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 0,
                            columnWidth: '25%',
                        },
                    },
                },
            },
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 4,
                columnWidth: '25%',
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: timeline,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: [
            {
                title: {
                    text: 'Orders',
                },
            },
            {
                opposite: true,
                title: {
                    text: 'Revenue',
                },
            },
        ],
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            fontFamily,
            fontWeight: 500,
            fontSize: '14px',
            markers: {
                radius: 99,
            },
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val}`,
            },
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 4,
        },
    };
};
export const optionsBarChart = (timeline: string[]): ApexOptions => {
    // Removed unused parameter 'timeline'
    return {
        colors: ['#3C50E0', '#80CAEE'],
        chart: {
            fontFamily: '"Satoshi", sans-serif', // Enclosed font name in quotes
            type: 'bar',
            height: 335,
            stacked: true,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },

        responsive: [
            {
                breakpoint: 1536,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 0,
                            columnWidth: '25%',
                        },
                    },
                },
            },
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 0,
                columnWidth: '25%',
            },
        },
        dataLabels: {
            enabled: false,
        },

        yaxis: {},

        xaxis: {
            categories: timeline,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            fontFamily: '"Satoshi"',
            fontWeight: 500,
            fontSize: '14px',

            markers: {
                radius: 99,
            },
        },
        fill: {
            opacity: 1,
        },
    };
};
