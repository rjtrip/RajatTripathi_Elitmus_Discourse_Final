import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EditorContainer from './EditorContainer';
export class PostForm extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            content: this.props.content,
            title: this.props.title,
            show: this.props.show,
            action: this.props.action,
            actionName: this.props.actionName
        }
        this.changePostBody = this.changePostBody.bind(this);
    }
    changePostBody(data){
        this.setState({
            ...this.state,
            content: data
        })
    }
    render(){
        return (
            <Formik
                initialValues={{
                    title: this.state.title || "",
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Title is required')
                })}
                onSubmit={(body, { setStatus,setErrors, setSubmitting }) => {
                    setStatus();
                    this.state.action({...body, body: this.state.content},{setStatus,setErrors,setSubmitting});
                }}
                render={({ errors, status, touched, isSubmitting }) => (
                    <Form>
                            {status &&
                            <div className={'alert alert-danger'}>{status}</div>
                            }
                        <div className="form-group">
                            <label htmlFor="title" className="mt-2 mb-2">Title :</label>
                            <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body" className="mt-1 mb-2">Body :</label>
                            <EditorContainer stateSaver={this.changePostBody} body={this.state.content} />
                        </div>
                        <div className="d-flex w-100 flex-row-reverse form-group mt-2 mb-2">
                            <button type="submit" className="btn btn-primary " disabled={isSubmitting}>{isSubmitting? <div className="spinner-border text-light"></div>:this.state.actionName}</button>
                        </div>
                        
                    </Form>
                )}
            />
                        
        )
    }
}
