import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.getItem('user') ?
            <Component {...props} /> : JSON.parse(localStorage.getItem('user')).role === "admin" ?
                <Redirect to={{ pathname: '/parkings', state: { from: props.location } }} />
                : <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
    )} />
)