import React, {Component} from 'react';
import PageHeader from '../../components/page-header';
import { List } from 'antd';
import LinkButton from '../../components/link-button';
import {ArrowLeftOutlined} from '@ant-design/icons';

export default class ProductDetail extends Component {
    render() {
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{marginRight: 5, color: '#0b85e8'}}/>
                </LinkButton>
                <span>一级分类列表</span>
            </span>
        )
        const data = [
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
        ];
        return (
            <div>
                <PageHeader />
                <List header={title}
                      bordered={true}
                      dataSource={data}
                      renderItem={item => (
                          <List.Item>
                              {item}
                          </List.Item>
                      )}
                />
            </div>
        );
    }
}