import React, {PureComponent} from 'react';
import {Form, Input, Select} from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

export default class UserAddForm extends PureComponent {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        roles: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
    };

    formRef = React.createRef();

    componentDidMount() {
        this.props.setForm(this.formRef.current);
    }

    render() {
        const { Item } = Form;
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const {roles, user} = this.props;
        return (
            <Form {...layout} ref={this.formRef}>
                <Item
                    label="用户名"
                    name="username"
                    initialValue={user.username}
                    rules={[{ required: true, message: '用户名必须输入' }]}
                >
                    <Input placeholder='请输入用户名'/>
                </Item>
                { user._id ? null :
                    (<Item
                        label="密码"
                        name="password"
                        initialValue={user.password}
                        rules={[{ required: true, message: '密码必须输入' }]}
                    >
                        <Input type="password" placeholder='请输入密码'/>
                    </Item>)
                }
                <Item
                    label="手机号"
                    name="phone"
                    initialValue={user.phone}
                    rules={[{ required: true, message: '手机号必须输入' }]}
                >
                    <Input placeholder='请输入手机号'/>
                </Item>
                <Item
                    label="邮箱"
                    name="email"
                    initialValue={user.email}
                    rules={[{ required: true, message: '邮箱必须输入' }]}
                >
                    <Input placeholder='请输入邮箱'/>
                </Item>
                <Item name="role_id" label="角色"
                      initialValue={user.role_id}
                      rules={[{ required: true, message: '角色必须输入' }]}
                >
                    <Select>
                        {
                            roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                        }
                    </Select>
                </Item>
            </Form>
        );
    }
}
