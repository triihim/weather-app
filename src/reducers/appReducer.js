import C, { E } from '../constants';

const initialState = {
    selectedObsPoint: -1,
    addModeOn: false,
    isFetching: false,
    fetchFailed: '',
    obsPoints: [],
    testMode: false
}

const appReducer = (state = initialState, action) => {

    switch(action.type) {

        case(C.TOGGLE_TESTMODE):
            return {
                ...state,
                testMode: !state.testMode
            }
            break;

        case(C.TOGGLE_ADDMODE): 
            return {
                ...state,
                addModeOn: !state.addModeOn
            }
            break; 

        case(C.FETCH_OBSERVATIONS):
            return {
                ...state,
                isFetching: true
            }
            break;

        case(C.FETCH_COMPLETE):
            return {
                ...state,
                isFetching: false,
                obsPoints: action.payload,
                fetchFailed: false
            }
            break;

        case(C.FETCH_ERROR):
            return {
                ...state,
                isFetching: false,
                fetchFailed: true
            }
            break;

        case(C.SELECT_OBSERVATION):
            return {
                ...state,
                selectedObsPoint: action.payload,
                addModeOn: false
            }
            break;

        case(C.UNSELECT_OBSERVATION):
            return {
                ...state,
                selectedObsPoint: -1,
                addModeOn: false
            }
            break;
            
    }

    return state;
}

export default appReducer;