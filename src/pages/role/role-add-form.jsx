import React, {PureComponent} from 'react';
import {Form, Input} from 'antd';
import PropTypes from 'prop-types';

export default class RoleAddForm extends PureComponent {
    static propTypes = {
        setForm: PropTypes.func.isRequired,
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
        return (
            <Form {...layout} ref={this.formRef}>
                <Item
                    label="角色名称"
                    name="roleName"
                    rules={[{ required: true, message: '角色名称必须输入' }]}
                >
                    <Input placeholder='请输入角色名称'/>
                </Item>
            </Form>
        );
    }
}
