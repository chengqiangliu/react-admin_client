import React, {Component} from 'react';
import {Card, Button, Table, Modal, message, Form, Input, Select} from 'antd';
import {ArrowRightOutlined, PlusOutlined} from '@ant-design/icons'

import './index.less'
import PageHeader from '../../components/page-header';
import LinkButton from '../../components/link-button';
import CategoryAddForm from './categoryAddForm';
import CategoryUpdateForm from './categoryUpdateForm';
import {getCategoryList} from '../../api'

export default class Category extends Component {
    state = {
        loading: false,
        stateStatus: 0,
        categoryList: [],
        subCategoryList: [],
        parentId: '0',
        parentName: '',
    };

    showAddModal = () => {
        this.setState({
            stateStatus: 1,
        });
    };

    showUpdateModal = () => {
        this.setState({
            stateStatus: 2,
        });
    };

    addCatogory = (e) => {
        this.setState({
            stateStatus: 0,
        });
    };

    closeAddModal = (e) => {
        this.setState({
            stateStatus: 0,
        });
    };

    updateCatogory = (e) => {
        this.setState({
            stateStatus: 0,
        });
    };

    closeUpdateModal = (e) => {
        this.setState({
            stateStatus: 0,
        });
    };

    getCategoryList = async (parentId) => {
        this.setState({loading: true});
        parentId = parentId || this.state.parentId;
        const result = await getCategoryList(parentId);
        this.setState({loading: false});
        if (result && result.status === 0) {
            const categoryList = result.data;
            if(parentId === '0') {
                this.setState({categoryList})
            } else {
                this.setState({
                    subCategoryList: categoryList
                })
            }
        } else {
            message.error('获取分类列表失败');
        }
    }

    showCategoryList = () => {
        this.setState({
            parentId: '0',
            subCategoryList: [],
            parentName: '',
        });
    }

    showSubCategoryList = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name,
        }, () => {
            getCategoryList();
        });
    }

    extra = (
        <Button type='primary' onClick={this.showAddModal}>
            <PlusOutlined />
            添加
        </Button>
    )

    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => {
                    return (
                        <span>
                            <LinkButton style={{color: '#0b85e8'}} onClick={() => this.showUpdateModal(category)}>修改分类</LinkButton>
                            <LinkButton style={{color: '#0b85e8'}} onClick={() => this.showSubCategoryList(category)}>查看子分类</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getCategoryList('0');
    }

    render() {
        const extra = this.extra;
        const {loading, categoryList, subCategoryList, parentId, parentName} = this.state;

        const title = parentId === '0'? '一级分类列表' : (
                <span>
                    <LinkButton onClick={this.showCategoryList}>一级分类列表</LinkButton>
                    <ArrowRightOutlined style={{marginRight: 5}}/>
                    <span>{parentName}</span>
                </span>
        )
        return (
            <div>
                <PageHeader />
                <Card title={title} extra={extra} className="home-card">
                    <Table rowKey='_id'
                           bordered
                           loading={loading}
                           dataSource={parentId === '0' ? categoryList : subCategoryList}
                           columns={this.columns}
                           pagination={{defaultPageSize: 5, showQuickJumper: true}}
                    />
                </Card>

                <Modal
                    title="添加分类"
                    visible={this.state.stateStatus === 1}
                    onOk={this.addCatogory}
                    onCancel={this.closeAddModal}
                >
                   <CategoryAddForm />
                </Modal>

                <Modal
                    title="修改分类"
                    visible={this.state.stateStatus === 2}
                    onOk={this.updateCatogory}
                    onCancel={this.closeUpdateModal}
                >
                    <CategoryUpdateForm />
                </Modal>
            </div>
        );
    }
}