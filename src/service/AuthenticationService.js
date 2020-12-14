import axios from 'axios';

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'USER_NAME_SESSION_ATTRIBUTE_NAME';
const API_URL = 'http://localhost:8080';

class AuthenticationService {
    registerSuccessfulLogin(user, pass) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, user);
        this.setupAxiosInterceptors(this.createBasicAuthToken(user, pass));
    }

    executeBasicAuth(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            {
                headers: {Authorization: this.createBasicAuthToken(username, password)}
            });
    }

    createBasicAuthToken(u, p) {
        let token = 'Basic ' + window.btoa(u + ":" + p);
        console.log('basic auth token: ' + token);
        return token;
    }

    setupAxiosInterceptors(token) {
        console.log('setting axios interceptor token: ' + token);
        axios.interceptors.request.use((config) => {
            if(this.isUserLoggedIn()) {
                console.log('using request token: ' + token);
                config.headers.Authorization = token;
                return config;
            } else {
                console.log('NOT using request token');
            }
        })
    }

    isUserLoggedIn() {
        let loginFlag = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME).length >= 1
        console.log('logged in? ' + loginFlag);
        return loginFlag;
    }
}

export default new AuthenticationService();