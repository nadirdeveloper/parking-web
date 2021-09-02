import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Topbar from '../../Layout/Topbar';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Topbar>
                <Component {...props} />
            </Topbar>
            : <Redirect to={{ pathname: '/user/login', state: { from: props.location } }} />
    )} />
)