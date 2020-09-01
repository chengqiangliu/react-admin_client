import React, {Component} from 'react';
import {Form, Input, Select} from 'antd';

export default class CategoryAddForm extends Component {
    formRef = React.createRef();
    render() {
        const { Option } = Select;
        const { Item } = Form;
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        return (
            <Form {...layout} ref={this.formRef}>
                <Item name="gender" label="Gender" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
                </Item>
                <Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Item>
            </Form>
        );
    }
}
