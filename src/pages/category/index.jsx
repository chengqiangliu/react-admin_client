import React, {Component} from 'react';
import {Card, Button, Table, Modal, message} from 'antd';
import {ArrowRightOutlined, PlusOutlined} from '@ant-design/icons'

import './index.less'
import PageHeader from '../../components/page-header';
import LinkButton from '../../components/link-button';
import CategoryAddForm from './categoryAddForm';
import CategoryUpdateForm from './categoryUpdateForm';
import {getCategoryList, addCategory, updateCategory} from '../../api'

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

    showUpdateModal = (category) => {
        this.category = category;
        this.setState({
            stateStatus: 2,
        });
    };

    addCatogory = async () => {
        try {
            const category = await this.addForm.validateFields();
            const result = await addCategory(category);
            if (result && result.status === 0) {
                await this.getCategoryList();
            } else {
                message.error('添加分类失败');
            }
            this.addForm.resetFields();
            this.setState({
                stateStatus: 0,
            });
        }catch (e) {
            message.error(e.message);
        }
    };

    closeAddModal = () => {
        this.addForm.resetFields();
        this.setState({
            stateStatus: 0,
        });
    };

    updateCategory = async () => {
        try {
            const {categoryName} = await this.updateForm.validateFields();
            const categoryId = this.category._id;
            const result = await updateCategory({categoryId, categoryName});
            this.updateForm.resetFields()
            if (result && result.status === 0) {
                await this.getCategoryList();
            } else {
                message.error('修改分类失败');
            }
            this.setState({
                stateStatus: 0,
            });
        }catch (e) {
            message.error(e.message);
        }
    };

    closeUpdateModal = (e) => {
        this.updateForm.resetFields();
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
            this.getCategoryList();
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
                            {
                                this.state.parentId === '0' ?
                                    <LinkButton style={{color: '#0b85e8'}} onClick={() => this.showSubCategoryList(category)}>查看子分类</LinkButton>
                                : null
                            }
                        </span>
                    )
                }
            },
        ];
    }

    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getCategoryList('0');
    }

    render() {
        const extra = this.extra;
        const {loading, categoryList, subCategoryList, parentId, parentName} = this.state;
        const category = this.category || {};

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
                   <CategoryAddForm key="addForm" parentId={parentId} categoryList={categoryList} setForm={(form) => {this.addForm = form}}/>
                </Modal>

                <Modal
                    title="修改分类"
                    visible={this.state.stateStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.closeUpdateModal}
                >
                    <CategoryUpdateForm key="updateForm" categoryName={category.name || ''} setForm={(form) => {this.updateForm = form}}/>
                </Modal>
            </div>
        );
    }
}