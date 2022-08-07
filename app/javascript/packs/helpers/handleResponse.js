import {authenticationService}  from '../services/authentication.service';

export function handleResponse(response,redirect=true) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                if(redirect){
                    authenticationService.logout();
                    location.reload(true);
                }
            }
            if(data.errors){
                return Promise.reject(data);
            }
            else{
                return Promise.reject(data.message || response.statusText);
            }
        }

        return data;
    });
}