import { handleResponse } from "../helpers/handleResponse";
import { authHeader } from "../helpers/auth-header";

function create(body){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    };

    return fetch('/api/v1/replies',requestOptions).then(handleResponse).then((data)=>{
        return data;
    })
}

export const replyService = {
    create
}
    
