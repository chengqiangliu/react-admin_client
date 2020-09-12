import React, {PureComponent} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Menu } from 'antd';
import * as Icons from '@ant-design/icons';
import {connect} from 'react-redux';

import menuList from '../../config/menuConfig'
import './index.less'
import PropTypes from 'prop-types';

const { SubMenu } = Menu;

class LeftNav extends PureComponent {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    hasAuth = (item) => {
        const user = this.props.user;
        const {key, isPublic} = item;
        const menus = user.role.menus;
        const username = user.username;

        if (isPublic || username === 'admin' || menus.indexOf(key) !== -1) {
            return true;
        } else if (item.children) {
            return !!item.children.find(child => menus.indexOf(child.key) !== -1);
        }
        return false;
    }

    getMenuNodes = (menuList) => {
         const path = this.props.location.pathname
         return menuList.map((item) => {
             const dynamicIcon = React.createElement(
                 Icons[item.icon],
             );
             if (this.hasAuth(item)) {
                 if (!item.children) {
                     return (
                         <Menu.Item key={item.key} icon={dynamicIcon}>
                             <Link to={item.key}>
                                 <span>{item.title}</span>
                             </Link>
                         </Menu.Item>
                     )
                 } else {
                     const childItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
                     if (childItem) {
                         this.openKey = item.key;
                     }
                     return (
                         <SubMenu key={item.key} title={item.title} icon={dynamicIcon}>
                             {this.getMenuNodes(item.children)}
                         </SubMenu>
                     )
                 }
             }
         })
    }

    /**
     * prepare data for render
     */
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        let path = this.props.location.pathname;
        if (path.indexOf('/product') === 0) {
            path = '/product';
        }
        const openKey = this.openKey;
        return (
            <div className="left-nav">
                <Menu mode="inline"
                      theme="dark"
                      selectedKeys={[path]}
                      defaultOpenKeys={[openKey]}>
                    {this.menuNodes}
                </Menu>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {}
)(withRouter(LeftNav));