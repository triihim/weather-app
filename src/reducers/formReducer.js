import C from '../constants';

const initialState = {
    formData: {
        obsPointID: '',
        temperature: ''
    },
    isPosting: false,
    formError: '',
    postSuccess: false,
}

const formReducer = (state = initialState, action) => {

    switch(action.type) {

        case(C.REMOVE_ALERT): {
            return {
                ...state,
                postSuccess: false
            }
        }

        case(C.SUBMIT_ADD): {
            return {
                ...state,
                isPosting: true
            }
            break;
        }

        case(C.CANCEL_ADD): {
            return {
                ...state,
                formData: {
                    ...state.formData,
                    obsPointID: '',
                    temperature: ''
                },
                formError: ''
            }
            break;
        }

        case(C.FORM_CHANGED): {
            if(action.payload.id == 'temperature') {
                return {
                    ...state,
                    formData: {
                        ...state.formData,
                        temperature: action.payload.value
                    }
                }
            } else if (action.payload.id == 'observationPoint') {
                return {
                    ...state,
                    formData: {
                        ...state.formData,
                        obsPointID: action.payload.value
                    }
                }
            }

            break;
        }

        case(C.FORMDATA_POSTED): {
            return {
                ...state,
                isPosting: false,
                formError: '',
                postSuccess: true
            }
            break;
        }

        case(C.FORM_ERROR): {
            return {
                ...state,
                formError: action.payload
            }
            break;
        }
    }

    return state;
}

export default formReducer;