import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from 'antd';
import 'antd/dist/antd.less';

import memoryUtils from '../../utils/memoryUtils';

export default class Index extends Component {
    render() {
        const user = memoryUtils.user;
        if (!user || !user.username) {
            return <Redirect to='/login' />
        } else {
            return (
                <div>
                    Hello, {user.username}
                </div>
            );
        }
    }
}