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
type State = {
    nearEarthObjects: NearEarthObject[];
    filter: Option | null;
    loading: boolean;
    error: Error | null;
};

class NearEarthObjectsContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nearEarthObjects: [],
            filter: null,
            loading: false,
            error: null,
        };
    }

    componentDidMount() {
        const fetchData = async () => {
            this.setState({ loading: true });
            try {
                const data = await API.fetchNearEarthObjects();
                this.setState({ nearEarthObjects: data });
            } catch (error) {
                this.setState({ error });
            } finally {
                this.setState({ loading: false });
            }
        };
        fetchData();
    }

    onRead: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        parse(file, {
            complete: ({ data }) => {
                const mappedData = mapCsvDataToNEOs(data as string[][]);
                this.setState({ nearEarthObjects: mappedData });
            } 
        });
    };

    setFilter = (filter: Option | null) => this.setState({ filter });

    render = () => {
        const { nearEarthObjects, filter, loading, error } = this.state;
        const { render, renderCsvReader, renderFilter } = this.props;
        const filteredObjects = getFilteredObjects(nearEarthObjects, filter);
        const filterOptions = getFilterOptions(nearEarthObjects);

        return (
            <>
                {renderCsvReader && renderCsvReader({ onRead: this.onRead })}
                {renderFilter && renderFilter({ filter, filterOptions, setFilter: this.setFilter })}
                {render({ nearEarthObjects: filteredObjects, loading, error })}
            </>
        );
    }

}

export default NearEarthObjectsContainer;