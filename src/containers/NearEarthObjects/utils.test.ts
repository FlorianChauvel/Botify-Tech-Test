import NearEarthObject from "../../types/NearEarthObject";
import { getFilteredObjects, getFilterOptions } from "./utils";

describe('NearEarthObjectsContainer utils', () => {
    const neos: NearEarthObject[] = [
        {
            id: '1', name: 'neo 1', estimated_diameter: {
                kilometers: {
                    estimated_diameter_max: 100,
                    estimated_diameter_min: 50,
                },
            },
            close_approach_data: [
                { orbiting_body: 'Earth' },
                { orbiting_body: 'Mars' },
            ],
        },
        {
            id: '2', name: 'neo 2', estimated_diameter: {
                kilometers: {
                    estimated_diameter_max: 100,
                    estimated_diameter_min: 50,
                },
            },
            close_approach_data: [
                { orbiting_body: 'Mars' },
                { orbiting_body: 'Juptr' },
            ],
        },
        {
            id: '3', name: 'neo 3', estimated_diameter: {
                kilometers: {
                    estimated_diameter_max: 100,
                    estimated_diameter_min: 50,
                },
            },
            close_approach_data: [
                { orbiting_body: 'Venus' },
                { orbiting_body: 'Merc' },
                { orbiting_body: 'Earth' },
            ],
        },
    ];
    describe('getFilteredObjects', () => {
        it('should return the original NEOs list if no filter is provided', () => {
            const result = getFilteredObjects(neos, null);
            expect(result).toEqual(neos);
        });
        it('should return the NEOs that have a matching orbiting body if a filter is provided', () => {
            const result = getFilteredObjects(neos, { label: 'Mars', value: 'Mars' });
            const expected = [neos[0], neos[1]];
            expect(result).toEqual(expected);
        });
    });
    describe('getFilterOptions', () => {
        it('should return a deduped list of all orbiting bodies of the NEOs', () => {
            const results = getFilterOptions(neos);
            const expected = [
                { label: 'Earth', value: 'Earth' }, 
                { label: 'Mars', value: 'Mars' }, 
                { label: 'Juptr', value: 'Juptr' }, 
                { label: 'Venus', value: 'Venus' }, 
                { label: 'Merc', value: 'Merc' }
            ];
            expect(results).toEqual(expected)
        })
    });
});