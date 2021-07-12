import React, { useState } from 'react';
import Select from 'react-select';
import BarChart from '../components/BarChart';
import TableChart from '../components/TableChart';
import NearEarthObjectsContainer from '../containers/NearEarthObjects';
import { BarChartOptions, TableChartOptions } from '../types/Chart';
import { Option } from '../types/Select';
import { mapNearEarthObjectsToBarChartData } from './utils';
const barOptions: BarChartOptions = {
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

const tableOptions: TableChartOptions = {
	showRowNumber: true,
	width: '100%',
	height: '100%',
};

const displayModes: Option[] = [
	{ label: 'Bars', value: 'Bars' },
	{ label: 'Table', value: 'Table' },
];

const NEOChart = () => {
	const [displayMode, setDisplayMode] = useState<Option | null>(displayModes[0]);

	return (
		<>
			<Select value={displayMode} onChange={setDisplayMode} options={displayModes} placeholder="Select display mode" />
			<NearEarthObjectsContainer
				renderCsvReader={({ onRead }) => <input type="file" onChange={onRead} placeholder="read csv" accept=".csv" />}
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
					const data = mapNearEarthObjectsToBarChartData(nearEarthObjects);
					return (displayMode?.value === 'Bars')
						? <BarChart data={data} options={barOptions} />
						: <TableChart data={data} options={tableOptions} />
			}}
		/>
		</>
	);
};

export default NEOChart;