require 'securerandom'
class User < ApplicationRecord
    has_secure_password
    validates :email,
             presence: {message: "Email can't be empty."} ,
            uniqueness: {message: 'Email %{value} already used by another user'}
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :username,
             presence: {message: "Username can't be empty."} ,
            uniqueness: {message: 'Username %{value} already used by another user'}
    validates :name, presence: {message: "Name can't be empty."}
    validates :password,
                length: { minimum: 6 },
                if: -> { new_record? || !password.nil? }
 
    def self.signin_or_create_from_provider(provider_data)
        user = User.find_by(email: provider_data[:info][:email])
        if !user
           user = User.create({email: provider_data[:info][:email],username: provider_data[:info][:email].split("@")[0], name:provider_data[:info][:name]})
           user.password = SecureRandom.alphanumeric(10)
           user.save!
        end
        user
    end    
end
