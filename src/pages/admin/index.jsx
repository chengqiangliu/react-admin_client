import React, {PureComponent} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import Pubsub from 'pubsub-js';
import {connect} from 'react-redux';

import 'antd/dist/antd.less';
import './index.less';

import HeaderContent from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from '../home';
import UserList from '../user/user-list';
import UserCenter from '../user/user-center';
import UserSetting from '../user/user-setting';
import Role from '../role';
import Category from '../category';
import Product from '../product';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import NotFound from '../not-found';
import PropTypes from 'prop-types';

const { Header, Footer, Sider, Content } = Layout;

class Admin extends PureComponent {

    state = {
        collapsed: false,
        marginSize: 200,
    };

    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    componentDidMount() {
        Pubsub.subscribe('Nav_Collapsed', (msg, collapsed) => {
            this.setState({
                collapsed: !this.state.collapsed,
            }, () => {
                if (this.state.collapsed) {
                    this.setState({
                        marginSize: 80,
                    });
                } else {
                    this.setState({
                        marginSize: 200,
                    });
                }
            });
        });
    }

    render() {
        const {user} = this.props;
        if (!user || !user.username) {
            return <Redirect to='/login' />
        } else {
            return (
                <Layout className='page-layout'>
                    <Header className='header-layout'>
                        <HeaderContent />
                    </Header>
                    <Layout className='main-content'>
                        <Sider collapsed={this.state.collapsed} className='slider-content'>
                            <LeftNav/>
                        </Sider>
                        <Layout style={{marginLeft: this.state.marginSize}}>
                            <Content className='right-content'>
                                <Switch>
                                    <Redirect exact from='/' to='/home'/>
                                    <Route path='/home' component={Home}/>
                                    <Route path='/category' component={Category}/>
                                    <Route path='/product' component={Product}/>
                                    <Route path='/role' component={Role}/>
                                    <Route path='/user/list' component={UserList}/>
                                    <Route path='/user/center' component={UserCenter}/>
                                    <Route path='/user/setting' component={UserSetting}/>
                                    <Route path='/charts/bar' component={Bar}/>
                                    <Route path='/charts/line' component={Line}/>
                                    <Route path='/charts/pie' component={Pie}/>
                                    <Route component={NotFound}/>
                                </Switch>
                            </Content>
                            <Footer className="footer">
                                <span>推荐使用谷歌浏览器，可以获得更佳页面操作体验</span>
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
            );
        }
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(Admin);