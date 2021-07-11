import React, { useState } from 'react';
import { useEffect } from 'react';
import NearEarthObject from '../../types/NearEarthObject';
import API from './api';

type RenderProps = {
    nearEarthObjects: NearEarthObject[];
    loading: boolean;
    error: Error | null;
};

type Props = {
    render: (props: RenderProps) => void;
};

const NearEarthObjectsContainer: React.FC<Props> = ({ render }) => {
    const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObject[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await API.fetchNearEarthObjects();
                setNearEarthObjects(data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return <>{render({ nearEarthObjects, loading, error })}</>;
};

export default NearEarthObjectsContainer;