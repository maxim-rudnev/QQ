import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { QuestionManager } from './components/QuestionManager.js';
import { Home } from './components/Home.js';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class AppOld extends Component {
    static displayName = AppOld.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={QuestionManager} />
                <Route path='/home' component={Home} />
            </Layout>
        );
    }
}
