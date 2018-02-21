import axios from 'axios';

import C, { E } from '../constants';
import { API_URL, VALIDATE_LOCATION } from '../config';

export default {

    toggleAddMode: () => {
        return(dispatch => {
            dispatch({ type: C.CANCEL_ADD });
            dispatch({ type: C.TOGGLE_ADDMODE });
        })
    },

    toggleTestMode: () => {
        VALIDATE_LOCATION.value = !VALIDATE_LOCATION.value;
        return {
            type: C.TOGGLE_TESTMODE
        }
    },

    fetchObservations: () => {
        return ((dispatch) => {

            dispatch({ type: C.FETCH_OBSERVATIONS });

            axios.get(API_URL + 'all')
            .then((res) => {
                dispatch({ type: C.FETCH_COMPLETE, payload: res.data });
            })
            .catch((error) => {
                dispatch({ type: C.FETCH_ERROR, payload: error });
            })

        });
            
    },

    selectObservation: (id) => {
        return {
            type: C.SELECT_OBSERVATION,
            payload: id
        }
    },

    unselectObservation: () => {
        return {
            type: C.UNSELECT_OBSERVATION
        }
    }

}