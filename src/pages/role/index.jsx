import React, {Component} from 'react';
import PageHeader from '../../components/page-header';
import {Button, Card, message, Modal, Table} from 'antd';
import {PAGE_SIZE} from '../../utils/common';
import RoleAddForm from './role-add-form';
import RoleAuth from './role-auth';
import {addRole, getRoles, reqUpdateRole} from '../../api';
import {formateDate} from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

export default class Role extends Component {
    state = {
        loading: false,
        roles: [],
        total: 0,
        role: {},
        modalVisible: 0,
    };

    constructor(props) {
        super(props);
        this.authRoleRef = React.createRef();
    }

    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: formateDate,
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formateDate,
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ];
    }

    getRoles = async () => {
        this.setState({loading: true});
        const result = await getRoles();
        this.setState({loading: false});
        if (result && result.status === 0) {
            const roles = result.data;
            this.setState({roles})
        } else {
            message.error('获取角色列表失败');
        }
    }

    showAddModal = () => {
        this.setState({
            modalVisible: 1,
        });
    };

    closeAddModal = () => {
        this.addForm.resetFields();
        this.setState({
            modalVisible: 0,
        });
    };

    addRole = async () => {
        try {
            const { roleName } = await this.addForm.validateFields();
            const result = await addRole(roleName);
            if (result && result.status === 0) {
                message.success('添加角色成功');
                await this.getRoles();
            } else {
                message.error('添加角色失败');
            }
            this.addForm.resetFields();
            this.setState({
                modalVisible: 0,
            });
        }catch (e) {
            console.log(e.message);
        }
    }

    showAuthModal = () => {
        this.setState({
            modalVisible: 2,
        });
    };

    authRole = async () => {
        try {
            const role = this.state.role;
            const menus = this.authRoleRef.current.getMenus();
            role.menus = menus;
            role.auth_time = Date.now();
            role.auth_name = memoryUtils.user.username

            // 请求更新
            const result = await reqUpdateRole(role)
            if (result.status===0) {
                // 如果当前更新的是自己角色的权限, 强制退出
                if (role._id === memoryUtils.user.role_id) {
                    memoryUtils.user = {}
                    storageUtils.removeUser()
                    this.props.history.replace('/login')
                    message.success('当前用户角色权限成功')
                } else {
                    message.success('设置角色权限成功')
                    await this.getRoles();
                }
            } else {
                message.error('当前用户角色权限失败');
            }
            // const result = await addRole(roleName);
            // if (result && result.status === 0) {
            //     message.success('添加角色成功');
            //     await this.getRoles();
            // } else {
            //     message.error('添加角色失败');
            // }
            // this.addForm.resetFields();
            this.setState({
                modalVisible: 0,
            });
        }catch (e) {
            message.error(e.message);
        }
    }

    closeAuthModal = () => {
        // this.addForm.resetFields();
        this.setState({
            modalVisible: 0,
        });
    };

    onRowHandler = (record) => {
        return {
            onClick: event => {
                this.setState({
                    role: record,
                })
            },
        };
    }

    componentDidMount = () => {
        this.getRoles();
    }

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    render() {
        const {loading, roles, total, role} = this.state;
        const title = (
            <span>
                <Button type='primary' onClick={this.showAddModal}>
                    创建角色
                </Button>
                <Button type='primary' disabled={!role._id} onClick={this.showAuthModal} style={{marginLeft: 10}}>
                    设置角色权限
                </Button>
            </span>
        );

        return (
            <div>
                <PageHeader />
                <Card title={title}>
                    <Table rowKey='_id'
                           bordered
                           rowSelection={{
                               type: 'radio',
                               selectedRowKeys: [role._id],
                               onSelect: (role) => {
                                   this.setState({
                                       role
                                   })
                               }

                           }}
                           onRow={this.onRowHandler}
                           loading={loading}
                           dataSource={roles}
                           columns={this.columns}
                           pagination={{
                               current: this.pageNum,
                               total,
                               defaultPageSize: PAGE_SIZE,
                               showQuickJumper: true,
                               onChange: this.getProducts}}
                    />
                </Card>
                <Modal
                    title="添加角色"
                    visible={this.state.modalVisible === 1}
                    onOk={this.addRole}
                    onCancel={this.closeAddModal}
                >
                    <RoleAddForm key="addForm" setForm={(form) => {this.addForm = form}} />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={this.state.modalVisible === 2}
                    onOk={this.authRole}
                    onCancel={this.closeAuthModal}
                >
                    <RoleAuth key="authForm" role={role} ref={this.authRoleRef} />
                </Modal>
            </div>
        );
    }
}