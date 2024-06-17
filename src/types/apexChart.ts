export type Series = {
    name?: string;
    data: number[];
};
export type Option = {
    series: number[] | Series[];
    options: {
        legend?: {
            labels: {
                colors: string;
            };
        };
        chart?: {
            type:
                | 'line'
                | 'area'
                | 'bar'
                | 'pie'
                | 'donut'
                | 'radialBar'
                | 'scatter'
                | 'bubble'
                | 'heatmap'
                | 'candlestick'
                | 'boxPlot'
                | 'radar'
                | 'polarArea'
                | 'rangeBar'
                | 'rangeArea'
                | 'treemap';
            height: number;
        };
        dataLabels?: {
            enabled: boolean;
        };
        yaxis?: {
            labels: {
                style: {
                    colors: string;
                };
            };
        };
        xaxis?: {
            type: 'datetime' | 'category';
            categories: string[];
            labels?: {
                style: {
                    colors: string;
                };
            };
        };
        stroke?: {
            curve:
                | 'smooth'
                | 'straight'
                | 'stepline'
                | 'linestep'
                | 'monotoneCubic'
                | ('smooth' | 'straight' | 'stepline' | 'linestep' | 'monotoneCubic')[];
        };
        tooltip?: {
            x: {
                format: string;
            };
        };
    };
};
