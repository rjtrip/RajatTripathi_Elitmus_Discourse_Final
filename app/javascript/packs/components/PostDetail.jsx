import React from "react";
import { authenticationService } from "../services/authentication.service";
import { postService } from "../services/post.service";
import { withRouter } from "../utils/hook-util";
import moment from "moment";
import ReplyForm from "./ReplyForm";
import ReplyItem from "./ReplyItem";
import PostDelete from "./PostDelete";
import UpdatePost from "./UpdatePost";
import renderHTML from 'react-render-html';
class PostDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post: null,
            creator: null,
            replies: null,
            date: null
        };
        this.add = this.add.bind(this);
        this.isOwner = this.isOwner.bind(this);
    }
    componentDidMount(){
        postService.findById(this.props.params.id).then((data)=>{
            this.setState({post: data,creator: data.creator, date: moment(data.published_at).fromNow(),replies: data.replies})
        })
    }
    add(reply){
        let replies = this.state.replies;
        replies.push(reply);
        this.setState({...this.state,replies: replies});
    }
    isOwner(){
        if(authenticationService.currentUserValue){
            if(authenticationService.currentUserValue.id == this.state.post.creator_id){
                return true;
            }
        }
        return false;
    }
    render(){
        return  (
            <div className="w-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#0099ff" fill-opacity="0.9" d="M0,256L14.1,256C28.2,256,56,256,85,234.7C112.9,213,141,171,169,149.3C197.6,128,226,128,254,149.3C282.4,171,311,213,339,224C367.1,235,395,213,424,186.7C451.8,160,480,128,508,117.3C536.5,107,565,117,593,154.7C621.2,192,649,256,678,250.7C705.9,245,734,171,762,149.3C790.6,128,819,160,847,154.7C875.3,149,904,107,932,90.7C960,75,988,85,1016,117.3C1044.7,149,1073,203,1101,202.7C1129.4,203,1158,149,1186,128C1214.1,107,1242,117,1271,133.3C1298.8,149,1327,171,1355,160C1383.5,149,1412,107,1426,85.3L1440,64L1440,0L1425.9,0C1411.8,0,1384,0,1355,0C1327.1,0,1299,0,1271,0C1242.4,0,1214,0,1186,0C1157.6,0,1129,0,1101,0C1072.9,0,1045,0,1016,0C988.2,0,960,0,932,0C903.5,0,875,0,847,0C818.8,0,791,0,762,0C734.1,0,706,0,678,0C649.4,0,621,0,593,0C564.7,0,536,0,508,0C480,0,452,0,424,0C395.3,0,367,0,339,0C310.6,0,282,0,254,0C225.9,0,198,0,169,0C141.2,0,113,0,85,0C56.5,0,28,0,14,0L0,0Z"></path>
                </svg>
                <div className="container">
                    {this.state.post && (
                    <div>
                        {this.isOwner()?  (
                            <div className="d-flex flex-row-reverse mt-3">
                                <PostDelete post={this.state.post} />
                                <UpdatePost post={this.state.post} />
                            </div>
                        ) : ""}
                        <div className="post-summary border-bottom">
                            <h3 className="mb-3 post-big-title">{this.state.post.title}</h3>
                        </div>
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
                                        {this.state.date}
                                    </div>     
                                </div>
                                <div className="">
                                    <div className="article-body mt-3 mb-5">
                                        {renderHTML(this.state.post.body)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className="mb-3 mt-5">Replies <i className="fa-solid fa-angle-down"></i></h2>
                        {this.state.post.replies.map((reply)=> <ReplyItem reply={reply} />)}

                        {authenticationService.currentUserValue ? <ReplyForm handleClick={this.add} id={this.state.post.id} />:<h5 className="text-center mt-5">Please log in if you want to comment</h5>}
                    </div>
                    )}
                    
                </div>
            </div>
            
        )
    }
}

export default withRouter(PostDetail);