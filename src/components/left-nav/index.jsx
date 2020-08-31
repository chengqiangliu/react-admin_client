import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import {
    PieChartOutlined,
    MailOutlined,
} from '@ant-design/icons';

import './index.less'

const { SubMenu } = Menu;

export default class LeftNav extends Component {
    render() {
        return (
            <div className="left-nav">
                <Menu mode="inline" theme="dark">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to='/home'>
                            首页
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined />} title="用户管理">
                        <Menu.Item key="5">
                            <Link to='/user'>
                                用户管理
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}