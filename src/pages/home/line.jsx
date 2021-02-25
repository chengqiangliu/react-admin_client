import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Line extends Component {

    state = {
        emails: [120, 132, 101, 134, 90, 230, 210],
        ads: [150, 232, 201, 154, 190, 330, 410],
        searchs: [820, 932, 901, 934, 1290, 1330, 1320],
    }

    getOption = (emails, ads, searchs) => {
        const option = {
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
        return (
            <div style={{float: 'right', width: 750, height: 200}}>
                <ReactEcharts option={this.getOption(emails, ads, searchs)}/>
            </div>
        );
    }
}