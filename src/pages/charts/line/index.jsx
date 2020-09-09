import React, {Component} from 'react';
import {Card, Button} from 'antd';
import ReactEcharts from 'echarts-for-react';

import PageHeader from '../../../components/page-header';

export default class Line extends Component {

    state = {
        emails: [120, 132, 101, 134, 90, 230, 210],
        ads: [150, 232, 201, 154, 190, 330, 410],
        searchs: [820, 932, 901, 934, 1290, 1330, 1320],
    }

    update = () => {
        this.setState({
            emails: this.state.emails.map((email) => email + 50),
            ads: this.state.ads.map((ad) => ad + 60),
            searchs: this.state.searchs.map((search) => search + 90),
        });
    }

    getOption = (emails, ads, searchs) => {
        const option = {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '视频广告', '搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: emails,
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: ads,
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: searchs,
                }
            ]
        };
        return option;
    }

    render() {
        const {emails, ads, searchs} = this.state;
        const title = (
            <span>
                <Button type='primary' onClick={this.update}>更新</Button>
            </span>
        )
        return (
            <div>
                <PageHeader />
                <div>
                    <Card title={title}>
                        <ReactEcharts option={this.getOption(emails, ads, searchs)}/>
                    </Card>
                </div>
            </div>
        );
    }
}