class AddUserRefToPosts < ActiveRecord::Migration[7.0]
  def change
    add_reference :posts, :creator
    add_foreign_key :posts, :users, column: :creator_id
  end
end
