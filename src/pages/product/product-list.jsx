import React, {Component} from 'react';
import PageHeader from '../../components/page-header';
import {Button, Card, Input, message, Select, Table} from 'antd';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import LinkButton from '../../components/link-button';

import {searchProducts, getProducts} from '../../api/index';
import {PAGE_SIZE} from '../../utils/common';

export default class ProductList extends Component {
    state = {
        loading: false,
        searchType: 'productName',
        searchName: '',
        products: [],
        total: 0,
    };

    extra = (
        <Button type='primary' onClick={() => this.props.history.push('/product/addUpdate')}>
            <PlusOutlined />
            添加商品
        </Button>
    )

    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                width: 150,
                dataIndex: 'price',
                render: (price) => '¥' + price,
            },
            {
                title: '状态',
                width: 100,
                render: (product) => {
                    const {status, _id} = product;
                    const newStatus = status === 1 ? 2 : 1;
                    return (
                        <span>
                          <Button type='primary'
                              onClick={() => this.updateStatus(_id, newStatus)}
                          >
                            {status===1 ? '下架' : '上架'}
                          </Button>
                          <span>{status===1 ? '在售' : '已下架'}</span>
                        </span>
                    );
                }
            },
            {
                title: '操作',
                width: 100,
                render: (product) => {
                    return (
                        <span>
                            <LinkButton style={{color: '#0b85e8'}} onClick={() => this.props.history.push('/product/detail')}>详情</LinkButton>
                            <LinkButton style={{color: '#0b85e8'}} onClick={() => this.props.history.push('/product/addUpdate')}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    updateStatus = (id, newStatus) => {

    }

    getProducts = async (pageNum) => {
        this.pageNum = pageNum;
        this.setState({loading: true});

        const {searchType, searchName} = this.state;
        let result;
        if (searchName) {
            result = await searchProducts({pageNum: 1, pageSize: PAGE_SIZE, searchType, searchName});
        } else {
            result = await getProducts(pageNum, PAGE_SIZE);
        }

        this.setState({loading: false});
        if (result && result.status === 0) {
            const {total, list} = result.data;
            this.setState({total, products: list});
        } else {
            message.error('获得产品失败');
        }
    }

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    componentDidMount = () => {
        this.getProducts(1);
    }

    search = async () => {
        this.getProducts(1);
    }

    render() {
        const { Option } = Select;
        const extra = this.extra;
        const {loading, searchType, searchName, products, total} = this.state;
        const title = (
            <span>
                <Select style={{width: 150}}
                        value={searchType}
                        onChange={value => this.setState({searchType: value})}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input style={{width: 150, margin: '0 10px'}}
                       placeholder='请输入分类名称'
                       value={searchName}
                       onChange={event => this.setState({searchName: event.target.value})} />
                <Button type='primary' onClick={this.search}>
                    <SearchOutlined />
                    检索
                </Button>
            </span>
        );

        return (
            <div>
                <PageHeader />
                <Card title={title} extra={extra}>
                    <Table rowKey='_id'
                           bordered
                           loading={loading}
                           dataSource={products}
                           columns={this.columns}
                           pagination={{
                               current: this.pageNum,
                               total,
                               defaultPageSize: PAGE_SIZE,
                               showQuickJumper: true,
                               onChange: this.getProducts}}
                    />
                </Card>
            </div>
        );
    }
}
