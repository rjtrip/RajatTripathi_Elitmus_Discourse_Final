import React from "react";
import { authenticationService } from "../services/authentication.service";
import { postService } from "../services/post.service";
import NewPost from "./newPost";
import PostItem from "./PostItem";
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts:[]
        }
    }
    componentDidMount(){
        postService.getPosts().then((posts)=>{
            this.setState({
                posts: posts
            })
        })
    }

    render(){
        return (
        <div className="w-100">
            <div className="home-header w-100">
                <div className="home-header-content w-100 d-flex justify-content-center align-items-center">
                    <div className="welcome-message">Welcome on our community!</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L48,250.7C96,245,192,235,288,192C384,149,480,75,576,69.3C672,64,768,128,864,154.7C960,181,1056,171,1152,144C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            </div>
            <div className="container">
                {authenticationService.currentUserValue && (
                    <NewPost />
                )}
                <p className="section-text">Latest posts</p>
                {this.state.posts.map((val)=> <PostItem key={val.id} post={val} />)}             
            </div>
        </div>
        
        )
    }
}