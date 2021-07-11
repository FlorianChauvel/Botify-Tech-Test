import React, { useState, useMemo, useEffect } from 'react';
import { parse } from 'papaparse';

import NearEarthObject from '../../types/NearEarthObject';
import { Option } from '../../types/Select';
import API from './api';
import { getFilteredObjects, getFilterOptions, mapCsvDataToNEOs } from './utils';

type RenderProps = {
    nearEarthObjects: NearEarthObject[];
    loading: boolean;
    error: Error | null;
};
type RenderFilterProps = {
    filter: Option | null;
    filterOptions: Option[];
    setFilter: (f: Option | null) => void;
};
type RenderCsvReaderProps = {
    onRead: (data: any) => void;
};

type Props = {
    render: (props: RenderProps) => void;
    renderFilter?: (props: RenderFilterProps) => void;
    renderCsvReader?: (props: RenderCsvReaderProps) => void;
};

const NearEarthObjectsContainer: React.FC<Props> = ({ render, renderFilter, renderCsvReader }) => {
    const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObject[]>([]);
    const [filter, setFilter] = useState<Option | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await API.fetchNearEarthObjects();
                setNearEarthObjects(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const onRead: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        parse(file, {
            complete: ({ data }) => {
                const mappedData = mapCsvDataToNEOs(data as string[][]);
                setNearEarthObjects(mappedData);
            } 
        });
    };

    const filteredObjects = useMemo(() => getFilteredObjects(nearEarthObjects, filter), [nearEarthObjects, filter]);
    const filterOptions = useMemo(() => getFilterOptions(nearEarthObjects), [nearEarthObjects]);

    return (
        <>
            {renderCsvReader && renderCsvReader({ onRead })}
            {renderFilter && renderFilter({ filter, filterOptions, setFilter })}
            {render({ nearEarthObjects: filteredObjects, loading, error })}
        </>
    );
};

export default NearEarthObjectsContainer;