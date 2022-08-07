import Modal from 'react-modal';
import React from 'react';
import  {postService} from '../services/post.service';
import history from '../helpers/history';

class PostDelete extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            show: false,
            post: this.props.post
        }
        this.delete = this.delete.bind(this);
    }
    delete(){
        let {post} = this.props;
        postService.deletePost(post.id).then((data)=>{
            history.push("/");
        },
        (error)=>{
            this.handleClose();
        }
        )
    }
    handleClose(e) {
        this.setState({...this.state,show: false});
    }
    handleOpen(e){
        e.preventDefault();
        this.setState({...this.state,show: true});
    }
    render(){
        return (
            <span className="mr-2">
              <div className="h5 text-danger" onClick={this.handleOpen.bind(this)}><i className="fa fa-trash"></i></div>
              <Modal isOpen={this.state.show}
                ariaHideApp={false}
                className="modal-dialog modal-dialog-centered"
               onRequestClose={this.handleClose.bind(this)}
              >
                        <div className="modal-content">
                            <div className="modal-header">
                            <button onClick={this.handleClose.bind(this)} className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div className="modal-body">
                                <p className="text-center">Do you really want to delete this post ?</p>
                                <div className="d-flex justify-content-center">
                                    <div className="d-flex justify-content-between w-25">
                                        <div><button className="btn btn-secondary" onClick={this.handleClose.bind(this)}>no</button></div>
                                        <div><button className="btn btn-danger" onClick={this.delete}>yes</button></div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
              </Modal>
            </span>
            
        )
    }
}

export default PostDelete;