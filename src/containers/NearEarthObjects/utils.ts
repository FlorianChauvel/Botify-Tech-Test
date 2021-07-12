import NearEarthObject from '../../types/NearEarthObject';
import { Option } from '../../types/Select';

export const getFilteredObjects = (neos: NearEarthObject[], filter: Option | null): NearEarthObject[] => {
    if (!filter) {
        return neos;
    }

    return neos.filter(neo => neo.close_approach_data.find(cadItem => cadItem.orbiting_body === filter.label));
};

// not the most optimized way to do it
// however: it's highly readable, at the moment it's used with a small amount of data and with a useMemo
// can be optimized easily.
export const getFilterOptions = (neos: NearEarthObject[]): Option[] => neos
    .reduce<string[]>((flattenedFilters, neo) => flattenedFilters.concat(neo.close_approach_data.map(item => item.orbiting_body)), []) // flatten
    .reduce<string[]>((deduppedFilters, filterCandidate) => deduppedFilters.includes(filterCandidate) ? deduppedFilters : deduppedFilters.concat(filterCandidate), []) // dedupe
    .map(filter => ({ label: filter, value: filter })) // format

export const mapCsvDataToNEOs = (data: string[][]): NearEarthObject[] => data.slice(1).map((objectData: any, index: number) => ({
    id: index.toString(),
    name: objectData[0],
    estimated_diameter: {
        kilometers: {
            estimated_diameter_min: parseInt(objectData[1], 10),
            estimated_diameter_max: parseInt(objectData[2], 10),
        }
    },
    close_approach_data: [],
}));