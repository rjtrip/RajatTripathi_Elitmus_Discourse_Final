import React from "react";
import PostDelete from "./PostDelete";
import { postService } from "../services/post.service";
import history from "../helpers/history";
import UpdatePost from "./UpdatePost";
export default class DraftItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            post: this.props.post,
        }
        this.publish = this.publish.bind(this);
    }
    publish(){
        let {post} = this.state;
        postService.updatePost(post.id,{published: true}).then((data)=>{
            history.push(`/posts/${post.id}`);
        })
    }
    render(){
        let {post} = this.state;
        return (
            <div className="d-flex justify-content-between border-bottom bt-4">
                <h5 className="p-3">{post.title}</h5>
                <div className="p-3 d-flex">
                    <p title="publish" className="text-primary mr-2 h5" onClick={this.publish}><i className="fa fa-share"></i></p>
                    <UpdatePost reload={true} post={post}/>
                    <PostDelete post={post} />
                </div>
            </div>
        )
    }
}