import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/handleResponse';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    register,
    googleAuth,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function createSession(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUserSubject.next(user);
    return user;
}

function googleAuth(body){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(`/api/v1/auth/google`, requestOptions)
        .then((resp)=>handleResponse(resp,false))
        .then(user => {
            return createSession(user);
        })
}
function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`/api/v1/auth/login`, requestOptions)
        .then((resp)=>handleResponse(resp,false))
        .then(user => {
            return createSession(user);
        })
}

function register(body){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(`/api/v1/auth/register`,requestOptions)
    .then(handleResponse)
        .then(user => {
            return createSession(user);
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
