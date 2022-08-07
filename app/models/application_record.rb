class ApplicationRecord < ActiveRecord::Base
  include ActiveModel::Dirty
  primary_abstract_class
end
