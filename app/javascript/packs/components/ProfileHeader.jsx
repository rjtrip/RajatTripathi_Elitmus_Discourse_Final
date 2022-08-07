import React from "react";
import { authenticationService } from "../services/authentication.service";

export default class ProfileHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: authenticationService.currentUserValue
        }
    }
    render(){
        let {user} = this.state;
        return (
            <div className="ml-5 mt-5 d-flex flex-row align-items-center border-bottom pb-5">
                <div className="icon-lg">
                <i className="fa-solid fa-user h2"></i>
                </div>
                <div className="pl-5">
                    <h3>{user.name}</h3>
                    <h5 className="mt-1 text-secondary">{user.username}</h5>
                </div>
            </div>
        )
    }
}