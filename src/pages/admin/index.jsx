import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import 'antd/dist/antd.less';

import memoryUtils from '../../utils/memoryUtils';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from '../home';
import User from '../user';
import Role from '../role';
import Category from '../category';
import Product from '../product';
import Bar from '../bar';
import Line from '../line';
import Pie from '../pie';

const { Footer, Sider, Content } = Layout;

export default class Index extends Component {
    render() {
        const user = memoryUtils.user;
        if (!user || !user.username) {
            return <Redirect to='/login' />
        } else {
            return (
                <Layout style={{minHeight: '100%'}}>
                    <Header/>
                    <Layout>
                        <Sider>
                            <LeftNav/>
                        </Sider>
                        <Layout>
                            <Content>
                                <Switch>
                                    <Route path='/home' component={Home}/>
                                    <Route path='/category' component={Category}/>
                                    <Route path='/product' component={Product}/>
                                    <Route path='/role' component={Role}/>
                                    <Route path='/user' component={User}/>
                                    <Route path='/charts/bar' component={Bar}/>
                                    <Route path='/charts/line' component={Line}/>
                                    <Route path='/charts/pie' component={Pie}/>
                                    <Redirect to='/home'/>
                                </Switch>
                            </Content>
                            <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                        </Layout>
                    </Layout>
                </Layout>
            );
        }
    }
}