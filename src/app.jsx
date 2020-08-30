import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/login/login';
import Home from './pages/home/home'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Home}></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}