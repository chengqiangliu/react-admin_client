import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './app';
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';
import store from './redux/store';

// read the user info from local and store it to memory
memoryUtils.user = storageUtils.getUser();

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);