import React from 'react';

const determineAlertType = (type) => {
    switch(type) {
        case('danger') : return 'alert alert-danger'; break;
        case('warning') : return 'alert alert-warning'; break;
        case('success') : return 'alert alert-success'; break;
    }
}

const Alert = (props) => {
    return(
        <div className='container'>
            <div className={determineAlertType(props.type)}>
                {props.msg}
            </div>
        </div>
    )
};

export default Alert;