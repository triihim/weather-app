import React from 'react';

import { prettyDate, prettyTime } from '../functions';

const getObsPointName = (obsPoints, obsPointID) => {
    let name;
    obsPoints.forEach((op) => {
        if(op._id == obsPointID) name = op.name;
    })
    return name;
}

const getObsPointCoords = (obsPoints, obsPointID) => {
    let coords;
    obsPoints.forEach((op) => {
        if(op._id == obsPointID) coords = op.latitude + ', ' + op.longitude;
    })
    return coords;
}

const getObservations = (obsPoints, obsPointID) => {
    let data;
    obsPoints.forEach((op) => {
        if(op._id == obsPointID) {
            data = op;
        }
    })
    return data.observations.map((observation, index) => {
        return(
            <tr key={index}>
                <td>{prettyDate(observation.dateTime)}</td>
                <td>{prettyTime(observation.dateTime)}</td>
                <td>{observation.temperature}</td>
            </tr>
        )
    })
}

const Details = (props) => {
    return(
        <div>
            <button 
                className='btn btn-secondary bg-light text-muted mb-1'
                onClick={() => {props.unselectObservation()}}
                >Back to dashboard</button>
            <h3 className='text-steelblue mb-0 text-capitalize'>
                {getObsPointName(props.obsPoints, props.obsPointID)}
            </h3>
            <small>{getObsPointCoords(props.obsPoints, props.obsPointID)}</small>
            <table className='table'>
            <thead>
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Time(UTC)</th>
                <th scope="col">Temperature(&deg;C)</th>
                </tr>
            </thead>
            <tbody>
                {getObservations(props.obsPoints, props.obsPointID)}
            </tbody>

            </table>
        </div>
    )
};

export default Details;