import { userConstants, dashboardConstants } from '../../Constants';
import { userService } from '../../Services';
import { notification } from 'antd';
import { history } from '../../utils/History';


export const userActions = {
    login,
    logout,
    getDashboardData,
    getAllUsers
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    notification.open({ message: "Successfully Logged In", type: "success" })
                    history.push('/user/home');
                },
                error => {
                    dispatch(failure(error));
                    notification.open({ message: error.message, type: "error" })
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getDashboardData() {
    return dispatch => {
        dispatch(request());
        userService.getDashboardData().then(
            data => {
                dispatch(success(data));
            },
            error => {
                dispatch(failure(error));
                notification.open({ message: error.message, type: "error" });
            }
        )
    }

    function request() { return { type: dashboardConstants.GET_DASHBOARD_REQUEST } };
    function success(data) { return { type: dashboardConstants.GET_DASHBOARD_SUCCESS, data } };
    function failure(error) { return { type: dashboardConstants.GET_DASHBOARD_SUCCESS, error } };
}


function getAllUsers() {
    return dispatch => {
        dispatch(request());
        userService.getAllUsers().then(
            data => {
                dispatch(success(data));
            },
            error => {
                dispatch(failure(error));
                notification.open({ message: error.message, type: "error" })
            }
        )
    }

    function request() { return { type: dashboardConstants.GET_USERS_REQUEST } };
    function success(data) { return { type: dashboardConstants.GET_USERS_SUCCESS, data } };
    function failure(error) { return { type: dashboardConstants.GET_USERS_SUCCESS, error } };
}
