import React, {Component} from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {login} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

import logo from './images/logo.png'
import './index.less'

export default class Index extends Component {
    onFinish = async (values) => {
        const {username, password} = values;
        const result = await login(username, password);
        if (result.status === 0) {

            // save the current user
            const user = result.data;
            memoryUtils.user = user;
            storageUtils.saveUser(user);

            // forward to admin page
            this.props.history.replace('/');
        } else {
            message.error(result.msg)
        }
    };

    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form onFinish={this.onFinish} >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '请输入用户名' },
                                { min: 4, message: '用户名最小长度为4' },
                                { max: 12, message: '用户名最大长度为12' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: '请输入密码' },
                                { min: 4, message: '密码最小长度为4' },
                                { max: 12, message: '密码最大长度为12' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}