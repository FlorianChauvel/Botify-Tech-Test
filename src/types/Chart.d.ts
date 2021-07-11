export type ChartData = Array<Array<string | number>>;

type TextStyleOptions = {
    bold: boolean;
    fontSize: number;
    color: string;
};

type AxisOptions = {
    title: string;
    minValue?: number;
    textStyle: TextStyleOptions;
    titleTextStyle: TextStyleOptions;
};

export type BarChartOptions = {
    title: string;
    chartArea?: {
        width?: string;
        height?: string;
    };
    hAxis: AxisOptions;
    vAxis: AxisOptions;
};

export type TableChartOptions = {
    showRowNumber: boolean;
    width: string;
    height: string;
};
