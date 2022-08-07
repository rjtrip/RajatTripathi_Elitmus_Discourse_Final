class AddUserRefToReplies < ActiveRecord::Migration[7.0]
  def change
    add_reference :replies, :creator
    add_foreign_key :replies, :users, column: :creator_id
  end
end
