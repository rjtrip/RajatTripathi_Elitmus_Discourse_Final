# Api Controller to handle our call backs
require 'json'
require 'googleauth/token_validator'
class Api::V1::SocialAuthController < Api::V1::ApplicationController
  def google_auth
    begin
    client_id = "552703900721-jcudelte6fsn2pn4tv2diisjs51jk3gr.apps.googleusercontent.com"
    valid = Google::Auth::TokenValidator.new(params[:token], client_id).validate
    @user = User.signin_or_create_from_provider(params) # this method add a user who is new or logins an old one
    token = JsonWebToken.encode(user_id: @user.id)
    time = Time.now + 24.hours.to_i
    render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                    username: @user.username }, status: :ok
    rescue => error
        Rails.logger.error error
        render json: { error: 'Something went wrong with the login.' }, status: :unprocessable_entity
    end
  end
end