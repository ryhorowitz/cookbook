class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  belongs_to :meal # probably could delete this down the line.
end
