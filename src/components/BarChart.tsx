import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { BarChartData, BarChartOptions } from '../types/BarChart';

type Props = {
    data: BarChartData;
    options: BarChartOptions;
};

const BarChart: React.FC<Props> = ({ data, options }) => {
    const [isReadyToDraw, setIsReadyToDraw] = useState(false);

    useEffect(() => {
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(() => setIsReadyToDraw(true));
    });

    useEffect(() => {
        if (!isReadyToDraw) {
            return;
        }
        drawChart(data, options);
    }, [data, options, isReadyToDraw]);

    return <ChartDiv id="bar-chart" />
};

const drawChart = (data: any, options: any) => {
    const formattedData = google.visualization.arrayToDataTable(data);
    const chart = new google.visualization.BarChart(document.getElementById('bar-chart'));
    chart.draw(formattedData, options);
};

const ChartDiv = styled.div`
    height: 80%;
`

export default BarChart;