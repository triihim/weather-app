import axios from 'axios';

import C from '../constants';
import { validateFormData } from '../functions';
import { API_URL } from '../config';
import A from './appActions';

export default {

    formChange: (target) => {
        return {
            type: C.FORM_CHANGED,
            payload: target
        }
    },

    submitForm: (formData, obsPoints) => {
        return(dispatch => {
            dispatch({ type: C.SUBMIT_ADD });

            validateFormData(formData, obsPoints)
            .then((result) => {
                axios.post(API_URL + 'all', {
                    obsPointID: result.obsPointID,
                    temperature: result.temperature
                }) 
                .then((response) => {
                    dispatch(A.fetchObservations());
                    dispatch(A.toggleAddMode());
                    dispatch({ type: C.FORMDATA_POSTED });
                    setTimeout(() => {
                        dispatch({ type: C.REMOVE_ALERT })
                    }, 5000)
                })
                .catch((error) => {
                    console.log(error)
                })    
            })
            .catch((error) => {
                dispatch({ type: C.FORM_ERROR, payload: error })
            })
        })
    },

    cancelForm: () => {
        return(dispatch => {
            dispatch({ type: C.CANCEL_ADD });
            dispatch({ type: C.TOGGLE_ADDMODE });
        })
    }
    
}