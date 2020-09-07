import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

// read the user info from local and store it to memory
memoryUtils.user = storageUtils.getUser();

ReactDOM.render(<App/>, document.getElementById('root'));