class Post < ApplicationRecord
    belongs_to :creator, class_name: 'User'
    has_many :replies, dependent: :destroy
    validates :body, presence: {message:"The body of your post can't be empty !"}
    validates :title, presence: {message:"Please give a title to your post !"}
    before_update :update_published_at

    def update_published_at
        if self.published_changed?
            self.published_at = Time.now
        end
        true
    end

    def replies_count
        replies.count
    end
end
