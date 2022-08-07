import React from "react";
import { GoogleLogin } from "react-google-login";
import { clientID } from "../helpers/google-auth-helper";
import { gapi } from "gapi-script";
import { authenticationService } from "../services/authentication.service";
import history from "../helpers/history";
export default class GoogleAuth extends React.Component{
    constructor(props){
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.configure();
    }
    configure(){
        let start = ()=>{
            gapi.client.init({
            clientId: clientID(),
            scope: 'profile email',
          });
        }
        gapi.load('client:auth2', start);
    }
    responseGoogle(response){
        var data = {
          token: response.tokenId,
          info: response.profileObj
        }
        console.log(data, "MY USER OBJECT I WANT TO SEND TO THE BACKEND")
        authenticationService.googleAuth(data).then((data)=>{
            history.push("/");
        },(error)=>{    
            console.log(error);
        });
    }
    render(){
        return(
                <div className="omni-auth">
                    <GoogleLogin
                    buttonText="continue with google"
                    clientId={clientID()}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    />
                </div>
        )
    }
}