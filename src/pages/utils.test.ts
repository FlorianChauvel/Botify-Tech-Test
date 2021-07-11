import NearEarthObject from "../types/NearEarthObject";
import { getAverageDistance, mapNearEarthObjectsToBarChartData } from "./utils";

describe('NEOChart utils', () => {
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
                    estimated_diameter_max: 200,
                    estimated_diameter_min: 100,
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
                    estimated_diameter_max: 300,
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
    describe('getAverageDistance', () => {
        it('should return the average distance of a NEO', () => {
            expect(getAverageDistance(neos[0])).toBe(75);
            expect(getAverageDistance(neos[1])).toBe(150);
            expect(getAverageDistance(neos[2])).toBe(175);
        });
    });
    describe('mapNearEarthObjectsToBarChartData', () => {
        const data = mapNearEarthObjectsToBarChartData(neos);
        it('should fill the first row with of the formatted data with relevant titles', () => {
            expect(data[0]).toEqual(['Neo Name', 'Min Estimated Diameter (km)', 'Max Estimated Diameter (km)']);
        });
        it('should sort the following rows by average diameter', () => {
            expect(data[1][0]).toEqual('neo 3');
            expect(data[2][0]).toEqual('neo 2');
            expect(data[3][0]).toEqual('neo 1');
        });
    });
});