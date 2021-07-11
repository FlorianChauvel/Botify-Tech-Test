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