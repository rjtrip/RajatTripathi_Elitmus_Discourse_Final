import { authHeader } from "../helpers/auth-header";
import { handleResponse } from "../helpers/handleResponse";

function getPosts(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch('/api/v1/posts',requestOptions).then(handleResponse).then((data)=>{
        return data;
    })
}

function findById(id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/v1/posts/${id}`,requestOptions).then(handleResponse).then((data)=>{
        return data;
    })
}

function createPost(body){
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader()
    }
    return fetch('/api/v1/posts',requestOptions).then(handleResponse).then((data)=>{
        return data;
    })
}
function deletePost(id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    }
    return fetch(`/api/v1/posts/${id}`,requestOptions).then(handleResponse).then((data)=>{
        return data;
    })
}
function updatePost(id,body){
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: authHeader()
    }
    return fetch(`/api/v1/posts/${id}`,requestOptions).then(handleResponse).then((data)=>{
        return data;
    })
}
function getDrafts(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/v1/post_drafts`,requestOptions).then(handleResponse).then((data)=>{
        return data;
    })
}
export const postService = {
    getPosts,
    createPost,
    findById,
    deletePost,
    updatePost,
    getDrafts
}
    
