import React from "react";
import {Outlet} from 'react-router-dom';
import Header from '../components/Header';
export default class Layout extends React.Component{
    
    render(){
        return (
            <div>
                <Header />
                <div className="page-content w-100">
                    <Outlet />
                </div>
            </div>
        )
        
        
    }
}