import React from 'react';
import Select from 'react-select';
import BarChart from '../components/BarChart';
import NearEarthObjectsContainer from '../containers/NearEarthObjects';
import { BarChartOptions } from '../types/BarChart';
import { mapNearEarthObjectsToBarChartData } from './utils';

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
        <>
			<NearEarthObjectsContainer
				renderFilter={({ filter, setFilter, filterOptions }) => (
					<Select value={filter} options={filterOptions} onChange={setFilter} isClearable placeholder="Filter by orbiting" />
				)}
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
		</>
    );
};

export default NEOChart;