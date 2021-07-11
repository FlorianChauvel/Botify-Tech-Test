type CloseApproachDataItem = {
    orbiting_body: string;
};

type NearEarthObject = {
    id: string;
    name: string;
    estimated_diameter: {
        kilometers: {
            estimated_diameter_min: number;
            estimated_diameter_max: number;
        };
    };
    close_approach_data: CloseApproachDataItem[];
};

export default NearEarthObject;