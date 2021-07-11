import React from 'react';
import BarChart from '../components/BarChart';
import NearEarthObjectsContainer from '../containers/NearEarthObjects';
import { BarChartData, BarChartOptions } from '../types/BarChart';
import NearEarthObject from '../types/NearEarthObject';

const getAverageDistance = (neo: NearEarthObject) => (neo.estimated_diameter.kilometers.estimated_diameter_min + neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;
const mapNearEarthObjectsToBarChartData = (neos: NearEarthObject[]): BarChartData => [
    ['Neo Name', 'Min Estimated Diameter (km)', 'Max Estimated Diameter (km)'],
    ...neos
        .slice() // slice to create a shallow copy before performing a mutating operation: sort
        .sort((a, b) => getAverageDistance(a) < getAverageDistance(b) ? 1 : -1)
        .map(neo => [neo.name, neo.estimated_diameter.kilometers.estimated_diameter_min, neo.estimated_diameter.kilometers.estimated_diameter_max])
];

const options: BarChartOptions = {
    title: 'NEOs travelling around the Earth',
    hAxis: {
      title: 'Estimated Diameter (km)',
      minValue: 10,
      textStyle: {
        bold: true,
        fontSize: 12,
        color: '#4d4d4d'
      },
      titleTextStyle: {
        bold: true,
        fontSize: 14,
        color: '#4d4d4d'
      }
    },
    vAxis: {
      title: 'NEO Name',
      textStyle: {
        fontSize: 12,
        bold: true,
        color: '#848484'
      },
      titleTextStyle: {
        fontSize: 14,
        bold: true,
        color: '#848484'
      },
    },
};

const NEOChart = () => {
    return (
        <NearEarthObjectsContainer
            render={({ nearEarthObjects, loading, error }) => {
                if (loading) {
                    return <p>loading data...</p>
                }
                if (error) {
                    return <p>Error: {error.message}</p>
                }
                return <BarChart data={mapNearEarthObjectsToBarChartData(nearEarthObjects)} options={options} />
            }}
        />
    );
};

export default NEOChart;