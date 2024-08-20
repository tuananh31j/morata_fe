import { ApexOptions } from 'apexcharts';

interface BarChartConfig {
  timeline: string[];
  colors?: string[];
  height?: number;
  stacked?: boolean;
  fontFamily?: string;
  animated?: boolean;
}

// export const BarChartOptions = ({
//   timeline,
//   colors = ['#3C50E0', '#80CAEE'],
//   height = 350,
//   stacked = true,
//   fontFamily = 'Satoshi, sans-serif',
//   animated = true,
// }: BarChartConfig): ApexOptions => {
//   return {
//     colors,
//     chart: {
//       fontFamily,
//       type: 'bar',
//       height,
//       stacked,
//       toolbar: {
//         show: false,
//       },
//       zoom: {
//         enabled: false,
//       },
//       animations: {
//         enabled: animated,
//         easing: 'easeinout',
//         speed: 800,
//         animateGradually: {
//           enabled: true,
//           delay: 150,
//         },
//         dynamicAnimation: {
//           enabled: true,
//           speed: 350,
//         },
//       },
//     },
//     responsive: [
//       {
//         breakpoint: 1536,
//         options: {
//           plotOptions: {
//             bar: {
//               borderRadius: 0,
//               columnWidth: '25%',
//             },
//           },
//         },
//       },
//     ],
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         borderRadius: 4,
//         columnWidth: '25%',
//         dataLabels: {
//           position: 'top',
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ['transparent'],
//     },
//     xaxis: {
//       categories: timeline,
//       axisBorder: {
//         show: false,
//       },
//       axisTicks: {
//         show: false,
//       },
//     },
//     yaxis: [
//       {
//         title: {
//           text: 'Orders',
//         },
//       },
//       {
//         opposite: true,
//         title: {
//           text: 'Revenue',
//         },
//       },
//     ],
//     legend: {
//       position: 'top',
//       horizontalAlign: 'left',
//       fontFamily,
//       fontWeight: 500,
//       fontSize: '14px',
//       markers: {
//         radius: 99,
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     tooltip: {
//       y: {
//         formatter: (val) => `${val}`,
//       },
//     },
//     grid: {
//       borderColor: '#f1f1f1',
//       strokeDashArray: 4,
//     },
//   };
// };
export const optionsBarChart = (timeline: string[]): ApexOptions => {
  return {
    colors: ['#6366F1', '#F59E0B'],
    chart: {
      fontFamily: '"Inter", sans-serif',
      type: 'bar',
      height: 450,
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      background: '#ffffff',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 6,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter(val: any) {
        return val != null ? val.toLocaleString() : '0';
      },
      style: {
        fontSize: '12px',
        fontWeight: 600,
        colors: ['#333'],
      },
      offsetY: -20,
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
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '10px',
          fontWeight: 400,
        },
      },
    },
    yaxis: [
      {
        title: {
          text: 'Đơn hàng',
          style: {
            color: '#6366F1',
            fontSize: '14px',
            fontWeight: 600,
          },
        },
        labels: {
          formatter(value: any) {
            return value != null ? Math.round(value).toLocaleString() : '0';
          },
          style: {
            colors: '#64748B',
          },
        },
      },
      {
        opposite: true,
        title: {
          text: 'Doanh thu',
          style: {
            color: '#F59E0B',
            fontSize: '14px',
            fontWeight: 600,
          },
        },
        labels: {
          formatter(value: any) {
            if (value == null) return '0';
            if (value >= 1e9) {
              return (value / 1e9).toFixed(1) + ' tỷ';
            } else if (value >= 1e6) {
              return (value / 1e6).toFixed(1) + ' triệu';
            } else {
              return value.toLocaleString() + ' đ';
            }
          },
          style: {
            colors: '#64748B',
          },
        },
      },
    ],
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '14px',
      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.85,
        stops: [50, 100],
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter(val: any) {
          return val != null ? `${val.toLocaleString()}` : '0';
        },
      },
    },
    grid: {
      borderColor: '#E2E8F0',
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    theme: {
      mode: 'light',
      palette: 'palette1',
      monochrome: {
        enabled: false,
        color: '#255aee',
        shadeTo: 'light',
        shadeIntensity: 0.65,
      },
    },
  };
};
