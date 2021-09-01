import { instance } from '../utils/AxiosConfig';
// import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    // getAll
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

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         // headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 // logout();
//                 // window.location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }