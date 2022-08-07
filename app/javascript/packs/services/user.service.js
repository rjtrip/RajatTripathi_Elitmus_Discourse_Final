
import { handleResponse } from "../helpers/handleResponse";

function get(id){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`/api/v1/users/${id}`,requestOptions).then(handleResponse).then((data)=>{
        return data;
    });
}

export const userService={
    get
} 