import React, {PureComponent} from 'react';
import {Form, Input, Select} from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;
const { Item } = Form;

export default class CategoryAddForm extends PureComponent {
    static propTypes = {
        categoryList: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired,
    };

    formRef = React.createRef();

    componentDidMount() {
        this.props.setForm(this.formRef.current);
    }

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({
            parentId: this.props.parentId,
        });
    }

    render() {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        const {parentId, categoryList} = this.props;
        return (
            <Form {...layout} ref={this.formRef}>
                <Item name="parentId" label="所属分类" initialValue={parentId} >
                    <Select>
                        <Option value='0'>一级分类</Option>
                        {
                            categoryList.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                        }
                    </Select>
                </Item>
                <Item
                    label="分类名称"
                    name="categoryName"
                    rules={[{ required: true, message: '分类名称必须输入' }]}
                >
                    <Input placeholder='请输入分类名称'/>
                </Item>
            </Form>
        );
    }
}
