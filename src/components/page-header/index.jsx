import React, {Component} from 'react';
import {DashboardOutlined} from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import {withRouter, Link} from 'react-router-dom';

import './index.less';
import menuList from '../../config/menuConfig'

class PageHeader extends Component {
    getPageList = (menuList) => {
        const path = this.props.location.pathname
        if (path === '/home') {
            return (
                <span key='/home' className="current-span">
                    <DashboardOutlined />
                    <span>首页</span>
                </span>
            )
        }
        const separator = ` / `;
        return menuList.map((item) => {
            const dynamicIcon = React.createElement(
                Icons[item.icon],
            );
            if (!item.children) {
                if (path.indexOf(item.key) === 0) {
                    return (
                        <div key="0">
                            <Link key='/home' to='/home' className="previous-link">
                                <DashboardOutlined />
                                <span>首页</span>
                            </Link>
                            {separator}
                            <span key={item.key} className="current-span">
                                <span>{item.title}</span>
                            </span>
                        </div>
                    )
                }
            } else {
                const childItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
                if (childItem) {
                    return (
                        <div key="0">
                            <Link key='/home' to='/home' className="previous-link">
                                <DashboardOutlined />
                                <span>首页</span>
                            </Link>
                            {separator}
                            <span key={item.key} className="previous-link">
                                {dynamicIcon}
                                <span>{item.title}</span>
                            </span>
                            {separator}
                            <span key={childItem.key} className="current-span">
                                <span>{childItem.title}</span>
                            </span>
                        </div>
                    )
                }
            }
        })
    }

    /**
     * prepare data for render
     */
    UNSAFE_componentWillMount() {
        this.pageList = this.getPageList(menuList);
    }

    render() {
        return (
            <div className="breadcrumb-div">
                {this.pageList}
            </div>
        );
    }
}

export default withRouter(PageHeader);