import React from 'react';
import moment from 'moment';
export default class ReplyItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reply: this.props.reply,
            date: moment(this.props.reply.created_at).fromNow(),
            creator: this.props.reply.creator
        }
    }
    render(){
        return (
            <div className="border-bottom article-item mt-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div className="icon"> <i className="fa-solid fa-user"></i> </div>
                        <div className="ms-2 ml-2 c-details">
                            <h6 className="mb-0">{this.state.creator.name}</h6> <span>{this.state.creator.username}</span>
                        </div>
                    </div>
                    <div className="text-secondary">
                        {this.state.date}
                    </div>     
                </div>
                <div className="article-body mt-3 mb-5">
                    {this.state.reply.body}
                </div>
            </div>
        )
    }
}