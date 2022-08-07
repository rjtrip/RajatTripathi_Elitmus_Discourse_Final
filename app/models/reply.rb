class Reply < ApplicationRecord
  belongs_to :post
  belongs_to :creator, class_name: 'User'
  validates :body, presence: {message: "Your comment can't be empty !"}
end
