class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :recipes_by_meal
  # has_many :recipes

  # def recipes_by_meal
  #   organized_recipes = {}

  #   object.meals.each do |meal|
  #     organized_recipes[meal.name] ||= []
  #   end

  #   object.recipes.each do |recipe|
  #     organized_recipes[recipe.meal_type] << recipe.truncated
  #   end

  #   organized_recipes
  # end

  def recipes_by_meal
    # organized_recipes = {}

    object.meals.map do |meal|
      {
        name: meal.name,
        recipes: meal.recipes.where('user_id = ?', object.id).map { |r| r.truncated }
      }
    end
  end
end
