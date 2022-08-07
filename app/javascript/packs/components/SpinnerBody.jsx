import React from "react";

export default class SpinnerBody extends React.Component{
    render(){
        return (
            <div className="position-absolute w-100 h-100 d-flex flex-column align-items-center bg-white justify-content-center">
                <div className="spinner-border">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}