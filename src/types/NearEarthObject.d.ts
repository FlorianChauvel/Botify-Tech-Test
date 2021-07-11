type NearEarthObject = {
    id: string;
    name: string;
    estimated_diameter: {
        kilometers: {
            estimated_diameter_min: number;
            estimated_diameter_max: number;
        };
    };
};

export default NearEarthObject;