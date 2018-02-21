import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../reducers/appReducer';
import formReducer from '../reducers/formReducer';

const mainReducer = combineReducers({
    appReducer,
    formReducer
});

const store = createStore(mainReducer, applyMiddleware(thunk));

export default store;