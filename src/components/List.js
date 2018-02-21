import React from 'react';

import Observation from './Observation';

import { getObsFrom24Hours, 
         getMaxTemp, 
         getMinTemp,
         getLatestTemp 
} from '../functions';

const renderObservationPoints = (props) => {
    return(
        props.obsPoints.map(op => {

            let obs24h = op.observations.filter(getObsFrom24Hours);
            let maxTemp = getMaxTemp(obs24h);
            let minTemp = getMinTemp(obs24h);
            let latestTemp = getLatestTemp(op.observations);

            return(
                <Observation 
                    key={op._id}
                    obsPointID={op._id}
                    location={op.name}
                    latitude={op.latitude}
                    longitude={op.longitude}
                    maxTemp={maxTemp}
                    minTemp={minTemp}
                    latestTemp={latestTemp}
                    selectObservation={props.selectObservation}
                />
            )
        })
    )
}

const List = (props) => {
    return(
        <div className='row'>
            <div className={(props.isFetching) ? '' : 'd-none'}>Loading...</div>
            {renderObservationPoints(props)}
        </div>
    )
};

export default List;