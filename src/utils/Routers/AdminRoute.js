import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';

export const AdminRoute = ({ component: Component, ...rest }) => {
    return (
    <Route {...rest} render={props => (
        !localStorage.getItem('user') ?
            <Redirect to={{ pathname: '/user/login', state: { from: props.location } }} /> : (JSON.parse(localStorage.getItem('user'))).role === "admin"
                ? <Sidebar {...props}>
                    <Component {...props} />
                </Sidebar> 
                : <Redirect to={{ pathname: '/user/home', state: { from: props.location } }} />
    )} />
)}