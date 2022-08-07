import React from "react";
import {Link} from 'react-router-dom';
import { authenticationService } from "../services/authentication.service";

export default class NavNormal extends React.Component{
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }
    logOut(){
        authenticationService.logout();
        location.reload(true);
    }
    render(){
        return (
            <nav className="nav">
                <p className="mr-3 font-weight-bold">Hello {authenticationService.currentUserValue.username}!</p>
                <Link to="/profile" className="mr-3 text-decoration-none text-dark">Profile</Link>
                <p className="mr-3" onClick={this.logOut}>Log out</p>
            </nav>
        )
            
    }
}
