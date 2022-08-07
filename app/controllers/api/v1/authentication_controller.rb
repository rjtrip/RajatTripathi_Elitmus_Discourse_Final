class Api::V1::AuthenticationController < Api::V1::ApplicationController
    

    # POST /auth/login
    def login
      @user = User.find_by_email(params[:email])
      if @user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: @user.id)
        time = Time.now + 24.hours.to_i
        render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                       username: @user.username, name: @user.name,id:@user.id }, status: :ok
      else
        render json: { error: 'unauthorized' }, status: :unauthorized
      end
    end
    #POST /auth/register
    def register
      @user = User.create(user_params)
      if @user.save
        token = JsonWebToken.encode(user_id: @user.id)
        time = Time.now + 24.hours.to_i
        render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                       username: @user.username, name: @user.name }, status: :ok
      else
        render json: {message: 'Some fields need to be checked',errors: @user.errors.to_hash}, status: :bad_request
      end
    end

    private

    def user_params
      params.permit(:username,:name,:email, :password)
    end

  end
