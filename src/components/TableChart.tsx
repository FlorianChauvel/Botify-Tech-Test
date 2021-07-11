import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChartData, TableChartOptions } from '../types/Chart';

type Props = {
    data: ChartData;
    options: TableChartOptions;
};

const TableChart: React.FC<Props> = ({ data, options }) => {
    const [isReadyToDraw, setIsReadyToDraw] = useState(false);

    useEffect(() => {
        google.charts.load('current', {'packages':['table']});
        google.charts.setOnLoadCallback(() => setIsReadyToDraw(true));
    }, []);

    useEffect(() => {
        if (!isReadyToDraw) {
            return;
        }
        drawChart(data, options);
    }, [data, options, isReadyToDraw]);

    return <ChartDiv id="table-chart" />
};

const drawChart = (data: ChartData, options: TableChartOptions) => {
    const formattedData = new google.visualization.DataTable();
    formattedData.addColumn('string', data[0][0]);
    formattedData.addColumn('number', data[0][1]);
    formattedData.addColumn('number', data[0][2]);
    formattedData.addRows(data.slice(1));
    const chart = new google.visualization.Table(document.getElementById('table-chart'));
    chart.draw(formattedData, options);
};

const ChartDiv = styled.div`
    height: 80%;
`;

export default TableChart;