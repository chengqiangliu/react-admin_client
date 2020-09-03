import React, {Component} from 'react';
import PageHeader from '../../components/page-header';
import {Card, Form, Input, Cascader, Select, Button} from 'antd';
import LinkButton from '../../components/link-button';
import PicturesWall from './picture-wall';
import {ArrowLeftOutlined} from '@ant-design/icons';

export default class ProductAddUpdate extends Component {

    onChange = (value) => {
        console.log(value);
    }

    render() {
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{marginRight: 5, color: '#0b85e8'}}/>
                </LinkButton>
                <span>添加商品</span>
            </span>
        )
        const { Option } = Select;
        const { Item } = Form;
        const { TextArea } = Input;
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        };
        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                    },
                ],
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                    {
                        value: 'nanjing',
                        label: 'Nanjing',
                    },
                ],
            },
        ];

        const imgs = ['image-1599140700956.png', 'image-1599140706498.png'];
        return (
            <div>
                <PageHeader />
                <Card title={title}>
                    <Form {...layout}>
                        <Item
                            label="商品名称"
                            name="productName"
                            rules={[{ required: true, message: '商品名称必须输入' }]}
                        >
                            <Input placeholder='请输入商品名称'/>
                        </Item>
                        <Item name="desc" label="商品描述">
                            <TextArea
                                placeholder="请输入商品描述"
                                autoSize={{ minRows: 2, maxRows: 3 }}
                            />
                        </Item>
                        <Item
                            label="商品价值"
                            name="price"
                            rules={[{ required: true, message: '商品价值必须输入' }]}
                        >
                            <Input type='number' addonAfter='元' placeholder='请输入商品价值' />
                        </Item>
                        <Item
                            label="商品分类"
                            name="category"
                            rules={[{ required: true, message: '商品分类必须输入' }]}
                        >
                            <Cascader
                                defaultValue={['zhejiang', 'hangzhou']}
                                options={options}
                                onChange={this.onChange}
                            />
                        </Item>
                        <Item
                            label="商品分类"
                            name="category"
                            rules={[{ required: true, message: '商品分类必须输入' }]}
                        >
                            <PicturesWall imgs={imgs} />
                        </Item>
                        <Item
                            label="商品详情"
                            name="productDesc"
                        >
                            <Input placeholder='请输入商品详情' />
                        </Item>
                        <Item>
                            <Button type="primary">Submit</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        );
    }
}