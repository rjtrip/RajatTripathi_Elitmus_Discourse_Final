
import { authenticationService } from "../services/authentication.service";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';
import React from "react";
import history from "../helpers/history";
import GoogleAuth from "./GoogleAuth";

export default class Signup extends React.Component{
    constructor(props){
        super(props);
        if(authenticationService.currentUserValue){
            history.push("/");
        }
    }
    render(){
        return (
            <div className="form-auth align-self-center shadow rounded">
                <div className="auth-header d-flex justify-content-center">
                    <div className="text-center bg-primary lock border rounded-circle d-flex justify-content-center align-items-center">
                        <i className="text-white fa-solid fa-unlock"></i>
                    </div>
                </div>
                <h1 className="h3 mb-3 fw-normal">Register yourself</h1>
                <Formik
                       initialValues={{
                           email: '',
                           password: '',
                           name: '',
                           username: '',
                           
                       }}
                       validationSchema={Yup.object().shape({
                           name: Yup.string().required('Name is required'),
                           username: Yup.string().required('Username is required'),
                           email: Yup.string().required('Email is required'),
                           password: Yup.string().required('Password is required')
                       })}
                       onSubmit={(body, {setErrors, setStatus, setSubmitting }) => {
                           setStatus();
                           authenticationService.register(body)
                               .then(
                                   (user) => {
                                     history.push("/");
                                   },
                                   error =>{
                                    setStatus(error.message);
                                    setErrors(error.errors);
                                    setSubmitting(false);
                                   }
                               )
                       }}
                       render={({ errors, status, touched, isSubmitting }) => (
                           <Form>
                                {status &&
                                   <div className={'alert alert-danger'}>{status}</div>
                                }
                                <div className="form-group">
                                   <label htmlFor="name" className="mt-2 mb-2">Name</label>
                                   <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                   <ErrorMessage name="name" component="div" className="invalid-feedback" />
                               </div>
                               <div className="form-group" >
                                   <label htmlFor="username" className="mt-2 mb-2">Username</label>
                                   <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                   <ErrorMessage name="username" component="div" className="invalid-feedback" />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="email" className="mt-2 mb-2">Email</label>
                                   <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                   <ErrorMessage name="email" component="div" className="invalid-feedback" />
                               </div>
                               <div className="form-group">
                                   <label htmlFor="password" className="mt-2 mb-2">New Password</label>
                                   <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                   <ErrorMessage name="password" component="div" className="invalid-feedback" />
                               </div>
                               <div className="form-group mt-2 mb-2">
                                   <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>{isSubmitting? <div className="spinner-border text-light"></div>:"Sign up"}</button>
                               </div>
                               
                           </Form>
                       )}
                   />
                <p className="text-center">Already an account <Link to="/auth" className="text-primary">click here</Link></p>
                <hr/>
                <GoogleAuth />
            </div>)
    }
}

