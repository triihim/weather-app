import React from 'react';

import { MIN_TEMP, MAX_TEMP, MAX_KM_DIST, VALIDATE_LOCATION } from '../config';

const getOptions = (obsPoints) => {
    return obsPoints.map((op, index) => {
        return <option key={index}
                className='text-capitalize'
                value={op._id}>
                    {op.name}
                </option>
    })
}

const AddForm = (props) => {
    return(
        <form>
            <div className='card mb-3 bg-light'>
                <div className='card-header'>
                    <span className='text-muted'>New observation</span>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='form-group col-sm-8'>
                            <label htmlFor='observationPoint'>Observation point</label>
                            <select id='observationPoint' 
                                    className='form-control text-capitalize'
                                    value={props.formData.obsPointID}
                                    onChange={(event) => props.formChange(event.target)}
                                    >
                                <option value=''></option>
                                {getOptions(props.obsPoints)}
                            </select>
                            <small className={(props.testMode) ? 'text-strike' : ''}>
                                You must be within {MAX_KM_DIST} km radius from this location's coordinates
                            </small>
                            <small>
                                <em className='text-primary'>
                                    <button onClick={() => props.toggleTestMode()}
                                        className='btn btn-link btn-sm'
                                        type='button'>
                                        Toggle test mode
                                    </button>
                                </em>
                            </small>
                        </div>
                        <div className='form-group col-sm-4 col-12'>
                            <label htmlFor='temperature'>Temperature(&deg;C)</label>
                            <input id='temperature'
                                    type='number' 
                                    min='-70' 
                                    max='70' 
                                    className='form-control'
                                    value={props.formData.temperature}
                                    onChange={(event) => props.formChange(event.target)}>
                            </input>
                            <small>Allowed range {MIN_TEMP}&deg;C to {MAX_TEMP}&deg;C</small>
                        </div>
                    </div>
                    <p className='text-danger d-inline'>
                        {(props.formError != '') ? 'Check input fields' : '' }
                    </p>
                    <div className='btn-toolbar float-right'>
                        <button className='btn btn-success'
                                type='button'
                                onClick={() => props.submitForm(props.formData, props.obsPoints)}>
                            Add
                        </button>
                        <button className='btn btn-warning text-light ml-1'
                                type='button'
                                onClick={() => props.cancelForm()}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
};

export default AddForm;