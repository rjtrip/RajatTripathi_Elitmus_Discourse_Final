import React from "react";
import moment from "moment";
import history from "../helpers/history";
import renderHTML from 'react-render-html';
export default class PostItem extends React.Component{

    constructor(props){
        super(props);
        let {post} = props;
        this.state = {
            post: post,
            creator: post.creator,
            id: post.id,
            title: post.title,
            count: post.replies_count,
            published: moment(post.published_at).fromNow(true)
        }
        this.goToDetails = this.goToDetails.bind(this)
    }
    goToDetails(){
        history.push(`posts/${this.state.id}`);
    }
    render(){
        return (
            <div className="card shadow mb-3 rounded" onClick={this.goToDetails}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                            <div className="icon"> <i className="fa-solid fa-user"></i> </div>
                            <div className="ms-2 ml-2 c-details">
                                <h6 className="mb-0">{this.state.creator.name}</h6>
                                <span>{this.state.creator.username}</span>
                                <span></span> 
                            </div>
                        </div>
                        <div className="text-secondary">
                            {this.state.published}
                        </div>     
                    </div>
                    <h6 className="post-title">{this.state.title}</h6>
                    <div className="">
                        <div className="article-body mt-3 mb-5">
                            {renderHTML(this.state.post.body)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}