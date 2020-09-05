import React, {Component} from 'react';
import PageHeader from '../../components/page-header';
import {Card, Form, Input, Cascader, Button, message} from 'antd';
import LinkButton from '../../components/link-button';
import PicturesWall from './picture-wall';
import {ArrowLeftOutlined} from '@ant-design/icons';
import RichEditor from './rich-editor';
import {addOrUpdateProduct} from '../../api/index';

import {getCategoryList} from '../../api/index';

export default class ProductAddUpdate extends Component {
    state = {
        options: [],
    }

    constructor(props) {
        super(props);
        this.picRef = React.createRef();
        this.detailRef = React.createRef();
    }

    onFinish = async (values) => {
        const {name, desc, price, categoryIds} = values;
        const imgs = this.picRef.current.getImgs();
        const detail = this.detailRef.current.getDetail();

        let pCategoryId;
        let categoryId;
        if(categoryIds.length === 1) {
            pCategoryId = '0';
            categoryId = categoryIds[0];
        } else if (categoryIds.length === 2) {
            pCategoryId = categoryIds[0];
            categoryId = categoryIds[1];
        }

        const product = {pCategoryId, categoryId, name, desc, price, imgs, detail};
        if(this.isUpdate) {
            product._id = this.product._id
        }

        const result = await addOrUpdateProduct(product);
        if (result && result.status === 0) {
            message.success(`${this.isUpdate ? '更新' : '添加'}商品成功!`)
            this.props.history.goBack();
        } else {
            message.error(`${this.isUpdate ? '更新' : '添加'}商品失败!`)
        }
    }

    validatePrice = (rule, value) => {
        console.log(rule, value);
        if (value * 1 > 0) {
            return Promise.resolve();
        } else {
            return Promise.reject('价格必须大于0');
        }
    }

    initOptions = (categoryList) => {
        const options = categoryList.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }));
        this.setState({options});
    }

    getCategoryList = async (parentId) => {
        const result = await getCategoryList(parentId);
        if (result && result.status === 0) {
            const categoryList = result.data;
            if(parentId === '0') {
                this.initOptions(categoryList)
            } else {
                return categoryList;
            }
        } else {
            message.error('获取分类列表失败');
        }
    }

    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        console.log(targetOption);
        targetOption.loading = true;

        // load options lazily
        const subCategories = await this.getCategoryList(targetOption.value);
        targetOption.loading = false;
        if (subCategories && subCategories.length > 0) {
            targetOption.children = subCategories.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }));
        } else {
            targetOption.isLeaf = true;
        }

        this.setState({
            options: [...this.state.options],
        });
    };

    UNSAFE_componentWillMount() {
        const product = this.props.location.state;
        this.isUpdate = !!product;
        this.product = product || {};
    }

    componentDidMount() {
        this.getCategoryList('0');
    }

    render() {
        const {isUpdate, product} = this;
        const {name, desc, price, pCategoryId, categoryId, imgs, detail} = product;
        let categoryIds = [];
        if (isUpdate) {
            if (pCategoryId === '0') {
                categoryIds.push(categoryId);
            } else {
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId);
            }
        }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{marginRight: 5, color: '#0b85e8'}}/>
                </LinkButton>
                <span>{isUpdate? '修改商品' : '添加商品'}</span>
            </span>
        )
        const { Item } = Form;
        const { TextArea } = Input;
        const layout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        };

        return (
            <div>
                <PageHeader />
                <Card title={title}>
                    <Form {...layout} onFinish={this.onFinish} >
                        <Item
                            label="商品名称"
                            name="name"
                            initialValue={name}
                            rules={[{ required: true, message: '商品名称必须输入' }]}
                        >
                            <Input placeholder='请输入商品名称'/>
                        </Item>
                        <Item name="desc"
                              initialValue={desc}
                              label="商品描述">
                            <TextArea
                                placeholder="请输入商品描述"
                                autoSize={{ minRows: 2, maxRows: 3 }}
                            />
                        </Item>
                        <Item
                            label="商品价值"
                            name="price"
                            initialValue={price}
                            rules={[{ required: true, message: '商品价值必须输入' },
                                { validator: this.validatePrice },
                            ]}
                        >
                            <Input type='number' addonAfter='元' placeholder='请输入商品价值' />
                        </Item>
                        <Item
                            label="商品分类"
                            name="categoryIds"
                            initialValue={categoryIds}
                            rules={[{ required: true, message: '商品分类必须输入' }]}
                        >
                            <Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                                changeOnSelect
                            />
                        </Item>
                        <Item label="商品图片">
                            <PicturesWall imgs={imgs} ref={this.picRef} />
                        </Item>
                        <Item
                            label="商品详情"
                            name="detail"
                            labelCol={{span:3}}
                            wrapperCol={{ span: 20 }}

                        >
                            <RichEditor ref={this.detailRef} detail={detail}/>
                        </Item>
                        <Item labelCol={{span:4}}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Item>
                    </Form>
                </Card>
            </div>
        );
    }
}