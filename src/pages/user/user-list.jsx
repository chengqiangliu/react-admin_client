import React, {Component} from 'react';
import PageHeader from '../../components/page-header';
import {Button, Card, message, Modal, Table} from 'antd';
import {PAGE_SIZE} from '../../utils/common';
import {formateDate} from '../../utils/dateUtils';
import LinkButton from '../../components/link-button';
import {reqGetUsers, reqAddOrUpdateUser, reqDeleteUser} from '../../api';
import UserAddForm from './user-add-form';
import {ExclamationCircleOutlined} from '@ant-design/icons';

export default class UserList extends Component {

    state = {
        loading: false,
        users: [],
        roles: [],
        total: 0,
        modalVisible: 0,
    };

    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name;
            return pre;
        },{});
        this.roleNames = roleNames;
    }

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateDate,
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: role_id => this.roleNames[role_id],
            },
            {
                title: '操作',
                width: 150,
                render: (record) => {
                    return (
                        <span>
                            <LinkButton style={{color: '#0b85e8'}} onClick={() => this.showUpdateUser(record)}>修改</LinkButton>
                            <LinkButton style={{color: '#0b85e8'}} onClick={() => this.deleteUser(record._id)}>删除</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    getUsers = async () => {
        this.setState({loading: true});
        const result = await reqGetUsers();
        this.setState({loading: false});
        if (result && result.status === 0) {
            const {users, roles} = result.data;
            this.initRoleNames(roles);
            this.setState({
                users,
                roles,
            })
        } else {
            message.error('获取用户列表失败');
        }
    }

    showAddModal = () => {
        this.user = {};
        this.setState({
            modalVisible: 1,
        });
    };

    addUpdateUser = async () => {
        try {
            const user = await this.addForm.validateFields();
            this.addForm.resetFields();
            let actionTYpe = '添加';
            if (this.user._id) {
                user._id = this.user._id;
                actionTYpe = '修改';
            }
            const result = await reqAddOrUpdateUser(user);
            if (result && result.status === 0) {
                message.success(`${actionTYpe}用户成功`);
                await this.getUsers();
            } else {
                message.error(`${actionTYpe}用户失败`);
            }
            this.addForm.resetFields();
            this.setState({
                modalVisible: 0,
            });
        }catch (e) {
            console.log(e.message);
        }
    }

    closeAddModal = () => {
        this.addForm.resetFields();
        this.setState({
            modalVisible: 0,
        });
    };

    showUpdateUser = (user) => {
        this.user = user;
        this.setState({
            modalVisible: 1,
        });
    }

    deleteUser = (userId) => {
        return Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '确认要删除此用户吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                const result = await reqDeleteUser(userId);
                if (result && result.status === 0) {
                    message.success('删除用户成功');
                    await this.getUsers();
                } else {
                    message.error('删除用户失败');
                }
            }
        });
    };

    componentDidMount = () => {
        this.getUsers();
    }

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    render() {
        const {loading, users, roles} = this.state;
        const user = this.user || {};
        const title = (
            <span>
                <Button type='primary' onClick={this.showAddModal}>
                    创建用户
                </Button>
            </span>
        );

        return (
            <div>
                <PageHeader />
                <Card title={title}>
                    <Table rowKey='_id'
                           bordered
                           onRow={this.onRowHandler}
                           loading={loading}
                           dataSource={users}
                           columns={this.columns}
                           pagination={{
                               defaultPageSize: PAGE_SIZE,
                               showQuickJumper: true,
                               onChange: this.getUsers}}
                    />
                    <Modal
                        title={user._id? '修改用户' : '创建用户'}
                        visible={this.state.modalVisible === 1}
                        onOk={this.addUpdateUser}
                        onCancel={this.closeAddModal}
                    >
                        <UserAddForm key="addForm" roles={roles} user={user} setForm={(form) => {this.addForm = form}} />
                    </Modal>
                </Card>
            </div>
        );
    }
}