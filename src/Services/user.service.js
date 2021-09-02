import { instance } from '../utils/AxiosConfig';
// import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getDashboardData
};

function login(email, password) {
    const requestBody = {
        email,
        password
    };
    return instance.post("/auth/login", requestBody)
        .then((response)=>{
            if(response.data.success){
                return response.data.user;
            }else{
                return Promise.reject(response.data)
            }
        })
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        }).catch((err)=>{
            if(err){
                return Promise.reject(err);
            }
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getDashboardData(){
    const authToken = (JSON.parse(localStorage.getItem("user"))).token;
    return instance.get("/admin/dashboard",{
        "headers":{
            "Authorizaion":`Bearer ${authToken}`
        }
    })
    .then((response)=>{
        if(response.data.success){
            return response.data.dashboardData;
        }else{
            return Promise.reject(response.data)
        }
    })
    .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('user', JSON.stringify(user));

        return user;
    }).catch((err)=>{
        if(err){
            return Promise.reject(err);
        }
    });
};