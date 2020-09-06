import React, {Component} from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const { Item } = Form;

export default class CategoryUpdateForm extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired,
    };

    formRef = React.createRef();

    componentDidMount() {
        this.props.setForm(this.formRef.current);
    }

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            categoryName: this.props.categoryName,
        });
    }
    render() {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const {categoryName} = this.props;
        return (
            <Form {...layout} ref={this.formRef}>
                <Item
                    label="分类名称"
                    name="categoryName"
                    rules={[{ required: true, message: '分类名称必须输入'}]}
                    initialValue={categoryName} >
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        );
    }
}
