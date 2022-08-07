import React from "react";
import { authenticationService } from "../services/authentication.service";
import history from "../helpers/history";
import ProfileHeader from "./ProfileHeader";
import { postService } from "../services/post.service";
import DraftItem from "./DraftItem";
import BookImage from 'images/book.png';
export default class Profile extends React.Component{

    constructor(props){
        super(props);
        if(!authenticationService.currentUserValue){
            history.push("/auth");
        }
        this.state = {
            drafts: []
        }
    }
    componentDidMount(){
        postService.getDrafts().then((data)=>{
            this.setState({drafts: data});
        })
    }
    render(){
        let {drafts} = this.state;
        return (
            <div className="container">
                <ProfileHeader />
                <h4 className="mt-5 ml-5 section-text">Drafts <img className="section-image" src={BookImage}/></h4>
                <div className="mt-4 ml-5">
                    {drafts.map((draft)=> <DraftItem post={draft} />)}
                    {drafts.length <=0 ?<p className="h4 text-center">No Drafts</p>:""}
                </div>
            </div>
        )
    }
}