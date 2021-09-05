import { userConstants, dashboardConstants } from '../../Constants';
import { userService } from '../../Services';
import { notification } from 'antd';
// import { history } from '../../utils/History';


export const userActions = {
    login,
    signup,
    logout,
    getDashboardData,
    getAllUsers,
    getAllAreas,
    getAllBookings,
    getAllParkings,
    getAllFeedbacks
};

function login(email, password, history) {
    return dispatch => {
        dispatch(request({ email }));
        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    notification.open({ message: "Successfully Logged In", type: "success" });
                    if(user.role === "admin"){
                        history.push('/admin/dashboard');
                    }else{
                        history.push('/user/home');
                    }
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

function signup(data,history) {
    return dispatch => {
        dispatch(request({ email: data.email }));
        userService.signup(data)
            .then(
                user => {
                    dispatch(success(user));
                    notification.open({ message: "Successfully Created Your Account", type: "success" });
                    history.push('/user/home');
                },
                error => {
                    dispatch(failure(error));
                    notification.open({ message: error.message, type: "error" })
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
    function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
}

function logout(history1) {
    userService.logout(history1);
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
    function failure(error) { return { type: dashboardConstants.GET_DASHBOARD_FAILURE, error } };
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
    function failure(error) { return { type: dashboardConstants.GET_USERS_FAILURE, error } };
}

function getAllAreas() {
    return dispatch => {
        dispatch(request());
        userService.getAllAreas().then(
            data => {
                dispatch(success(data));
            },
            error => {
                dispatch(failure(error));
                notification.open({ message: error.message, type: "error" })
            }
        )
    }

    function request() { return { type: dashboardConstants.GET_AREAS_REQUEST } };
    function success(data) { return { type: dashboardConstants.GET_AREAS_SUCCESS, data } };
    function failure(error) { return { type: dashboardConstants.GET_AREAS_FAILURE, error } };
}

function getAllBookings() {
    return dispatch => {
        dispatch(request());
        userService.getAllBookings().then(
            data => {
                dispatch(success(data));
            },
            error => {
                dispatch(failure(error));
                notification.open({ message: error.message, type: "error" })
            }
        )
    }

    function request() { return { type: dashboardConstants.GET_BOOKINGS_REQUEST } };
    function success(data) { return { type: dashboardConstants.GET_BOOKINGS_SUCCESS, data } };
    function failure(error) { return { type: dashboardConstants.GET_BOOKINGS_FAILURE, error } };
}

function getAllParkings() {
    return dispatch => {
        dispatch(request());
        userService.getAllParkings().then(
            data => {
                dispatch(success(data));
            },
            error => {
                dispatch(failure(error));
                notification.open({ message: error.message, type: "error" })
            }
        )
    }

    function request() { return { type: dashboardConstants.GET_PARKINGS_REQUEST } };
    function success(data) { return { type: dashboardConstants.GET_PARKINGS_SUCCESS, data } };
    function failure(error) { return { type: dashboardConstants.GET_PARKINGS_FAILURE, error } };
}

function getAllFeedbacks() {
    return dispatch => {
        dispatch(request());
        userService.getAllFeedbacks().then(
            data => {
                dispatch(success(data));
            },
            error => {
                dispatch(failure(error));
                notification.open({ message: error.message, type: "error" })
            }
        )
    }

    function request() { return { type: dashboardConstants.GET_FEEDBACKS_REQUEST } };
    function success(data) { return { type: dashboardConstants.GET_FEEDBACKS_SUCCESS, data } };
    function failure(error) { return { type: dashboardConstants.GET_FEEDBACKS_FAILURE, error } };
}
