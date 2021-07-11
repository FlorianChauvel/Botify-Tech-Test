import NearEarthObject from '../../types/NearEarthObject';

type FetchNearEarthObjectsResponse = {
    near_earth_objects: NearEarthObject[];
};

const fetchNearEarthObjects = async (): Promise<NearEarthObject[]> => {
    const url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=SohfFlEBbQJlmBzrGabnMvzNCtCNlG7nVERrXCQ1&size=20';
    const response = await fetch(url);
    if (response.status !== 200) {
        throw Error('Something went wrong while fetching data');
    }
    const data: FetchNearEarthObjectsResponse = await response.json();
    return data.near_earth_objects;
};

const API = {
    fetchNearEarthObjects,
};

export default API;