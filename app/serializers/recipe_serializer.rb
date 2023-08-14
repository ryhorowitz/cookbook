class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :meal_type
  # belongs_to :meal
end
