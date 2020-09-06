import React, {Component} from 'react';
import PageHeader from '../../components/page-header';
import {List, Card, message} from 'antd';
import LinkButton from '../../components/link-button';
import {ArrowLeftOutlined} from '@ant-design/icons';
import PropsTypes from 'prop-types';
import {BASE_IMG_URL} from '../../utils/common'
import {getCategory} from '../../api/index';
import './product.less';

const Item = List.Item

export default class ProductDetail extends Component {
    static propsTypes = {
        product: PropsTypes.object.isRequired,
    };

    state = {
        pCategory: '',
        category: '',
    };

    async componentDidMount() {
        const {pCategoryId, categoryId} = this.props.location.state;
        if (pCategoryId === '0') {
            const result = await getCategory(categoryId);
            if (result && result.status === 0) {
                this.setState({
                    pCategory: result.data.name,
                });
            } else {
                message.error('获取分类失败');
            }
        } else {
            const results = await Promise.all([getCategory(pCategoryId), getCategory(categoryId)]);
            if (results && results[0].status === 0 && results[1].status === 0) {
                this.setState({
                    pCategory: results[0].data.name,
                    category: results[1].data.name,
                });
            } else {
                message.error('获取分类失败');
            }
        }
    }

    render() {
        const {name, desc, price, imgs, detail} = this.props.location.state;
        const {pCategory, category} = this.state;
        debugger
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{marginRight: 5, color: '#0b85e8'}}/>
                </LinkButton>
                <span>{name}</span>
            </span>
        )
        return (
            <div>
                <PageHeader />
                <Card title={title}>
                    <List className='product-detail'>
                        <Item>
                            <span className="label">商品名称:</span>
                            <span>{name}</span>
                        </Item>
                        <Item>
                            <span className="label">商品描述:</span>
                            <span>{desc}</span>
                        </Item>
                        <Item>
                            <span className="label">商品价格:</span>
                            <span>{price}元</span>
                        </Item>
                        <Item>
                            <span className="label">所属分类:</span>
                            <span>{pCategory} {category ? ' --> '+category : ''}</span>
                        </Item>
                        <Item>
                            <span className="label">商品图片:</span>
                            <span>
                              {
                                  imgs.map(img => (
                                      <img
                                          key={img}
                                          src={BASE_IMG_URL + img}
                                          className="product-img"
                                          alt="img"
                                      />
                                  ))
                              }
                            </span>
                        </Item>
                        <Item>
                            <span className="label">商品详情:</span>
                            <span dangerouslySetInnerHTML={{__html: detail}}>
                            </span>
                        </Item>
                    </List>
                </Card>
            </div>
        );
    }
}