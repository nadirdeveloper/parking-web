import { instance } from '../utils/AxiosConfig';
// import { authHeader } from '../_helpers';

export const userService = {
    login,
    signup,
    logout,
    getDashboardData,
    getAllUsers,
    getAllAreas,
    getAllParkings,
    getAllBookings,
    getAllFeedbacks,
    addUser,
    addArea,
    replyFeedback,
    getAreaSlots,
    getUserBookings,
    bookParkingSlot,
    deleteUser,
    changeUserRole,
    deleteArea,
    deleteParking,
    deleteBooking,
    getUserFeedbacks,
    saveUserFeedback,
    cancelBooking,
    cancelAdminBooking
};

function login(email, password) {
    const requestBody = {
        email,
        password
    };
    return instance.post("/auth/login", requestBody)
        .then((response) => {
            if (response.data.success) {
                return response.data.user;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
}

function signup(data) {
    return instance.post("/auth/signup", data)
        .then((response) => {
            if (response.data.success) {
                return response.data.user;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
}

function logout(history) {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    history.push("/user/login");
}

function getDashboardData() {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.get("/admin/dashboard", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data.dashboardData;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(user));

            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};


function getAreaSlots(areaData) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/parking/getAllSlots", areaData, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data.allParkings;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function getUserFeedbacks() {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.get("/parking/getFeedback", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function saveUserFeedback(data) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/parking/saveFeedback", data, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function bookParkingSlot(parkingData) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/parking/bookParkingSlot", parkingData, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};


function getUserBookings() {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.get("/parking/getBookings", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function getAllAreas() {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.get("/admin/getAllAreas", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data.allAreas;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function getAllParkings() {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.get("/admin/getAllParkings", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data.allParking;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function getAllBookings() {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.get("/admin/getAllBookings", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data.allBookings;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function getAllFeedbacks() {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.get("/admin/getAllFeedbacks", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data.allFeedbacks;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function getAllUsers() {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.get("/admin/getAllUsers", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data.allUsers;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function addUser(data) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/admin/addUser", data, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function replyFeedback(data) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/admin/replyFeedback", data, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};


function addArea(data) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/admin/createArea", data, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
};

function changeUserRole(userId, role) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/admin/changeUserRole", { userId, role }, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
}

function deleteUser(userId) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.delete("/admin/deleteUser", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
        data: {
            userId
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
}

function deleteArea(areaId) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.delete("/admin/deleteArea", {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
        data: {
            areaId
        }
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
}

function cancelBooking(bookingId) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/parking/cancelBooking", {
        bookingId
    }, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
}

function cancelAdminBooking(bookingId) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/admin/cancelBooking", {
        bookingId
    }, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
}
function deleteBooking(bookingId) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/admin/deleteBooking", {
        bookingId
    }, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
}

function deleteParking(parkingId) {
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.post("/admin/deleteParking", {
        parkingId
    }, {
        "headers": {
            "Authorization": `Bearer ${authToken}`
        },
    })
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            return user;
        }).catch((err) => {
            if (err) {
                return Promise.reject(err);
            }
        });
}