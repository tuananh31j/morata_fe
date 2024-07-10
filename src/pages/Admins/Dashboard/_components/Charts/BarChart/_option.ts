import { ApexOptions } from 'apexcharts'; // Ensure 'apexcharts' is installed and recognized by your IDE or build tool

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
