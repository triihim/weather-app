import React from 'react';

const Observation = (props) => {
    return(
        <div className='col-lg-4 col-md-6 col-sm-12'>
            <div className='card mb-3'>
                <div className='card-header'>
                    <h5 className='card-title d-inline text-steelblue text-capitalize'>
                        {props.location}
                    </h5>
                    <small className='mt-0 d-block'>{props.latitude}, {props.longitude}</small>
                </div>        
                <div className='card-body'>

                <div className='container'>
                <div className='row text-center'>
                    <div className='col-4'>
                        <h5 className='temperature mb-0'>{props.latestTemp}&deg;C</h5>
                        <small>Last obs.</small>
                    </div>
                    <div className='col-4'>
                        <h5 className='temperature mb-0'>{props.minTemp}&deg;C</h5>
                        <small>Lowest 24h</small>
                    </div>
                    <div className='col-4'>
                        <h5 className='temperature mb-0'>{props.maxTemp}&deg;C</h5>
                        <small>Highest 24h</small>
                    </div>
                </div>
                </div>

                </div>
                <div className='card-footer text-center'>
                    <button className='btn btn-primary text-light'
                        onClick={() => {props.selectObservation(props.obsPointID)}}
                    >Observations</button>
                </div>            
            </div>
        </div>
    )
};

export default Observation;