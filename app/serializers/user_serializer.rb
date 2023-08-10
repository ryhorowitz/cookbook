class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :meals
  has_many :recipes
end
