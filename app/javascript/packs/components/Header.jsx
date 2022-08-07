import React from "react";
import NavAuth from './NavAuth';
import { authenticationService } from "../services/authentication.service";
import NavNormal from "./NavNormal";
import { Link } from "react-router-dom";
export default class Header extends React.Component{
    
    render(){
        return <div className="d-flex justify-content-center shadow-sm w-100 clearfix">
            <div className="content d-flex justify-content-between w-75 p-3">
                <div className="navbar-brand mb-0 h1">
                    <Link to="/" className="text-decoration-none text-dark">ELLITEST</Link>
                </div>
                {!authenticationService.currentUserValue && <NavAuth />}
                {authenticationService.currentUserValue && <NavNormal />}
            </div>
        </div>
    }
}