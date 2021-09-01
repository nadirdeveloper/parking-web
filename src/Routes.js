import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard';
import Login from './Pages/User/Login';
import { history } from './utils/History';
import { AdminRoute } from './utils/Routers/AdminRoute';
import { AuthRoute } from './utils/Routers/AuthRoute';
import { PrivateRoute } from './utils/Routers/PrivateRoute';
export default function Routes() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <AuthRoute path="/login" exact component={Login} />
                    <PrivateRoute path="/parkings" exact component={Dashboard} />
                    <AdminRoute path="/dashboard" exact component={Dashboard} />
                    <Redirect from="/" to="/login" exact  />
                </Switch>
            </Router>
        </div>
    )
}
