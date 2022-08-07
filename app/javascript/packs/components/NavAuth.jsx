import React from "react";
import {Link} from "react-router-dom";
export default class NavAuth extends React.Component{

    render(){
        return (
            <div className="navigation">
                <Link to="/auth/register"  className="btn btn-primary ml-5">Sign Up</Link>
                <Link to="/auth" className="btn btn-primary ml-5">Log In</Link>
            </div>
        )
            
    }
}
