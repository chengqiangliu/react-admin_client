import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd';
import PropTypes from 'prop-types';
import menuList from '../../config/menuConfig';

const { Item } = Form;

export default class RoleAuth extends Component {
    static propTypes = {
        role: PropTypes.object,
    }

    constructor (props) {
        super(props)
        this.formRef = React.createRef();

        const {menus} = this.props.role
        this.state = {
            checkedKeys: menus,
        }
    }

    getMenus = () => {
        return this.state.checkedKeys;
    }

    getTreeNodes = (menuList) => {
        let topMenu = {title: '平台权限', key: 'all'};
        topMenu.children = menuList;
        return [topMenu];
    }

    onCheck = checkedKeys => {
        this.setState({
            checkedKeys
        });
    };

    /*
    当组件接收到新的属性时自动调用
   */
    componentWillReceiveProps (nextProps) {
        const menus = nextProps.role.menus;
        this.setState({
            checkedKeys: menus,
        });
    }

    componentWillMount () {
        this.treeData = this.getTreeNodes(menuList)
    }

    render() {
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 15 },
        };

        const role = this.props.role;
        const {checkedKeys} = this.state;
        return (
            <div>
                <Item disabled
                    label="角色名称"
                     {...layout}>
                    <Input value={role.name} disabled/>
                </Item>
                <Item labelCol={{span:8}}
                      wrapperCol={{ span: 20 }}>
                    <Tree
                        checkable
                        defaultExpandAll
                        checkedKeys={checkedKeys}
                        onCheck={this.onCheck}
                        treeData={this.treeData}
                    />
                </Item>
            </div>
        );
    }
}
