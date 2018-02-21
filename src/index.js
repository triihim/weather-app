import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css';

import AppContainer from './containers/AppContainer';

ReactDOM.render(
    <Provider store={store}>
     <AppContainer />
    </Provider>,
    document.getElementById('app-root')
);


