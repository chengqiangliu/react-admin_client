import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Dropdown, Avatar, Button, Modal } from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import logo from '../../assets/images/logo.png'
import LinkButton from '../link-button';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import './index.less'

class Header extends Component {
    state = {
        collapsed: false,
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    redirectToHome = () => {
        this.props.history.push('/home');
    };

    logout = () => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确认要退出系统吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                // remove user info from memory and local
                memoryUtils.user = {};
                storageUtils.removeUser();

                // 跳转到login
                this.props.history.replace('/login')
            }
        });
    };

    menu = (
        <Menu>
            <Menu.Item key="0">
                <LinkButton>
                    个人信息
                </LinkButton>
            </Menu.Item>
            <Menu.Item key="1">
                <LinkButton>
                    修改密码
                </LinkButton>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">
                <LinkButton onClick={this.logout}>
                    退出系统
                </LinkButton>
            </Menu.Item>
        </Menu>
    );

    render() {
        return (
            <div className="header">

                <header className="header-logo" onClick={this.redirectToHome}>
                    <img src={logo} alt="logo" />
                    <h2>后台管理系统</h2>
                </header>
                <div className="header-menu-button">
                    <LinkButton onClick={this.toggleCollapsed}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </LinkButton>
                </div>
                <div className="header-avatar">
                    <Dropdown overlay={this.menu}>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}>
                        </Avatar>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
