import React from "react";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import history from "./helpers/history";
import Layout from "./pages/Layout";
import AuthLayout from "./pages/AuthLayout";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Signup from "./components/Signup";
import PostDetail from "./components/PostDetail";
import Profile from "./components/Profile";
export default class App extends React.Component{
    render(){
        return (
         <HistoryRouter history={history}>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path="posts/:id" element={<PostDetail />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/auth" element={<AuthLayout />} >
                    <Route index element={<Signin />}/>
                    <Route path="register" element={<Signup />}/>
                </Route>
            </Routes>
         </HistoryRouter>
        )
    }
}
