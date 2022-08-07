import Modal from 'react-modal';
import React from 'react';
import { PostForm } from './PostForm';
import { postService } from '../services/post.service';
import SpinnerBody from './SpinnerBody';
class UpdatePost extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            show: false,
            post: this.props.post|| {},
            reload: this.props.reload
        }
        this.update = this.update.bind(this);
    }
    handleClose(e) {
        this.setState({show: false});
    }
    handleOpen(e){
        e.preventDefault();
        let {reload,post } = this.state;
        if(reload){
            postService.findById(post.id).then((data)=>{
                this.setState({show:true,reload: false, post: data});
            })
        }
        else{
            this.setState({show: true, post: post, reload: false});
        }
    }
    update(body,formProps){
        let {post} = this.state;
        let {setStatus, setSubmitting, setErrors} = formProps;
        postService.updatePost(post.id,body).then(data=>{
            location.reload(true);
        },
        error=>{
            setStatus(error.message);
            setErrors(error);
            setSubmitting(false);
        })
    }

    render(){
        let {reload} = this.state;
        return (
            
            <span className="mr-2">
              <div className="h5 text-primary" onClick={this.handleOpen.bind(this)}><i className="fa fa-pencil"></i></div>
              <Modal isOpen={this.state.show}
                ariaHideApp={false}
                className="modal-dialog modal-post modal-lg"
               onRequestClose={this.handleClose.bind(this)}
              >
                        <div className="modal-content">
                            <div className="modal-header">
                            <button onClick={this.handleClose.bind(this)} className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            { reload ?  <SpinnerBody /> :(
                            <div className="modal-body">
                                <h1 className="h3 fw-normal">Edit a post.</h1>
                                <p className="mb-3">Make change to your posts.</p>
                                <PostForm action={this.update} actionName={"Update"} content={this.state.post.body} title={this.state.post.title} /> 
                            </div>
                            ) }
                            
                        </div>
              </Modal>
            </span>
            
        )
    }
}

export default UpdatePost;