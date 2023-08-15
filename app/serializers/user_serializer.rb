class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :recipes_by_meal
  # has_many :recipes

  def recipes_by_meal
    organized_recipes = {}

    object.meals.each do |meal|
      organized_recipes[meal.name] ||= []
    end

    object.recipes.each do |recipe|
      organized_recipes[recipe.meal_type] << recipe.truncated
    end

    organized_recipes
  end
end
