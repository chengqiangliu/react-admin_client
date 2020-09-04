import React, {Component} from 'react';
import {Upload, Modal, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import getBase64 from '../../utils/commonUtils';
import {deleteImage} from '../../api';
import {BASE_IMG_URL} from '../../utils/common';

export default class PicturesWall extends Component {
    static propTypes = {
        imgs: PropTypes.array,
    };

    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
            /*{
                uid: '-1', // 每个file都有自己唯一的id
                name: 'xxx.png', // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片地址
            },*/
        ],
    };

    getImgs = () => {
        let imgs = [];
        this.state.fileList.map(file => imgs.push(
            file.name
        ));
        return imgs;
    }

    constructor(props) {
        super(props);
        let fileList = [];
        const {imgs} = this.props;
        if (imgs && imgs.length > 0) {
            imgs.map((img, index) => fileList.push({
                uid: -index,
                name: img,
                status: 'done',
                url: BASE_IMG_URL + img,
            }));
        }
        // 初始化状态
        this.state = {
            previewVisible: false, // 标识是否显示大图预览Modal
            previewImage: '', // 大图的url
            fileList // 所有已上传图片的数组
        }
    }

    closePreview = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = async ({file, fileList}) => {
        if (file.status === 'done') {
            const {response} = file;
            if (response.status === 0) {
                message.success('上传图片成功');

                const {name, url} = response.data;
                fileList[fileList.length-1].name = name;
                fileList[fileList.length-1].url = url;
            } else {
                message.error('上传图片失败');
            }
        } else if (file.status === 'removed') {
            const response = await deleteImage(file.name);
            if (response.status === 0) {
                message.success('删除图片成功');
            } else {
                message.error('删除图片失败');
            }
        }
        // 必须写在这里，否则handleChange只被调用一次
        this.setState({ fileList: [...fileList] });
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    name='image'
                    accept='image/*'
                    action="/manage/img/upload"
                    listType='picture-card'
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.closePreview}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}