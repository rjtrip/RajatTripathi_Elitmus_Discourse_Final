import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { replyService } from '../services/reply.service';
export default class ReplyForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            handleClick: this.props.handleClick
        }
    }
    render(){
        return (
            <div className="mt-5">
                <h2>Add a reply</h2>
                <Formik
                    initialValues={{
                        body: ''
                    }}
                    validationSchema={Yup.object().shape({
                        body: Yup.string().required('You should at least write something.')
                    })}
                    onSubmit={(body, {resetForm, setErrors, setStatus, setSubmitting }) => {
                        setStatus();
                        replyService.create({...body,post_id: this.state.id}).then(data=>{
                            resetForm();
                            this.state.handleClick(data);
                        },
                        error=>{
                            setErrors(error.errors);
                            setSubmitting(false);
                        })
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <Field name="body" as="textarea"  className={'form-post-body form-control' + (errors.body && touched.body ? ' is-invalid' : '')} />
                                <ErrorMessage name="body" component="div" className="invalid-feedback" />
                            </div>
                            <div className="d-flex w-100 flex-row-reverse form-group mt-2 mb-2">
                                <button type="submit" className="btn btn-primary " disabled={isSubmitting}>{isSubmitting? <div className="spinner-border text-light"></div>:"Reply"}</button>
                            </div>
                        </Form>
                    )}
                />
            </div>
        )
    }
}