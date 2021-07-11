import { BarChartData } from '../types/BarChart';
import NearEarthObject from '../types/NearEarthObject';

export const getAverageDistance = (neo: NearEarthObject) => (neo.estimated_diameter.kilometers.estimated_diameter_min + neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;

export const mapNearEarthObjectsToBarChartData = (neos: NearEarthObject[]): BarChartData => [
    ['Neo Name', 'Min Estimated Diameter (km)', 'Max Estimated Diameter (km)'],
    ...neos
        .slice() // slice to create a shallow copy before performing a mutating operation: sort
        .sort((a, b) => getAverageDistance(a) < getAverageDistance(b) ? 1 : -1)
        .map(neo => [neo.name, neo.estimated_diameter.kilometers.estimated_diameter_min, neo.estimated_diameter.kilometers.estimated_diameter_max])
];