class Api::V1::ApplicationController < ActionController::API
  def not_found
    render json: { error: 'not_found' }
    end

    def authenticated_user
        header = request.headers['Authorization']
        header = header.split(' ').last if header
        @decoded = JsonWebToken.decode(header)
        User.find(@decoded[:user_id])
    end

    def authorize_request
        begin
            @current_user = authenticated_user
        rescue ActiveRecord::RecordNotFound => e
            render json: { errors: e.message }, status: :unauthorized
        rescue JWT::DecodeError => e
            render json: { errors: e.message }, status: :unauthorized
        end
    end

    def has_access(object_owner)
        begin
            user = authenticated_user
            if user.id != object_owner
                false
            else
                true
            end
        rescue ActiveRecord::RecordNotFound => e
            false
        rescue JWT::DecodeError => e
            false
        end 
    end
  end
