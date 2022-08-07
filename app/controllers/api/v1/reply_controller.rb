class Api::V1::ReplyController < Api::V1::ApplicationController
    before_action :authorize_request
    #POST /api/v1/replies
    def create
        @reply = Reply.create(reply_params)
        @reply.creator_id = @current_user.id
        if@reply.save
            render json: @reply.to_json(include: {creator:{:except => :password_digest}}), status: :ok
        else
            render json: {message: "Something went wrong!", errors: @reply.errors.to_hash}, status: :bad_request
        end
    end

    private
    def reply_params
        params.permit(:body,:post_id)
    end
end