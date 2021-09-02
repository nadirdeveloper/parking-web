import React from 'react'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard';
import Login from './Pages/User/Login';
import Home from './Pages/User/Home';
import { history } from './utils/History';
import { AdminRoute } from './utils/Routers/AdminRoute';
import { AuthRoute } from './utils/Routers/AuthRoute';
import { PrivateRoute } from './utils/Routers/PrivateRoute';
import BookParking from './Pages/User/BookParking';
import ViewParkings from './Pages/User/ViewParkings';
import Feedback from './Pages/User/Feedback';
import AllAreas from './Pages/Admin/AllAreas';
import AllParkings from './Pages/Admin/AllParkings';
import AllUsers from './Pages/Admin/AllUsers';
import AllBookings from './Pages/Admin/AllBookings';
import AllFeedbacks from './Pages/Admin/AllFeedbacks';
export default function Routes() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <AuthRoute path="/user/login" exact component={Login} />
                    <PrivateRoute path="/user/home" exact component={Home} />
                    <PrivateRoute path="/user/bookParking" exact component={BookParking} />
                    <PrivateRoute path="/user/viewParkings" exact component={ViewParkings} />
                    <PrivateRoute path="/user/feedback" exact component={Feedback} />
                    <AdminRoute path="/admin/dashboard" exact component={Dashboard} />
                    <AdminRoute path="/admin/allAreas" exact component={AllAreas} />
                    <AdminRoute path="/admin/allParkings" exact component={AllParkings} />
                    <AdminRoute path="/admin/allUsers" exact component={AllUsers} />
                    <AdminRoute path="/admin/allBookings" exact component={AllBookings} />
                    <AdminRoute path="/admin/allFeedbacks" exact component={AllFeedbacks} />
                    <Redirect from="/" to="/user/login" exact />
                </Switch>
            </Router>
        </div>
    )
}
