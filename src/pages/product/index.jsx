import React, {Component} from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import ProductList from './product-list';
import ProductAddUpdate from './product-add-update';
import ProductDetail from './product-detail';

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product' component={ProductList} exact />
                <Route path='/product/addUpdate' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product' />
            </Switch>
        );
    }
}