import React, {Component} from 'react';
import { Form, Input } from 'antd';

export default class CategoryUpdateForm extends Component {
    formRef = React.createRef();
    render() {
        const { Item } = Form;
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        return (
            <Form {...layout} ref={this.formRef}>
                <Item
                    label="分类名称"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Item>
            </Form>
        );
    }
}
