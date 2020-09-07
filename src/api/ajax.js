import axios from 'axios';
import {message} from 'antd';

export default function ajax(url, data={}, method='GET') {
    return new Promise((resolve, reject) => {
        let promise;
        if (method === 'POST') {
            promise = axios.post(url, data);
        } else {
            promise = axios.get(url, {
                params: data
            });
        }
        promise.then(
            response => resolve(response.data)
        ).catch(
            error => message.error(`请求失败，error：${error.message}`)
        )
    });
}