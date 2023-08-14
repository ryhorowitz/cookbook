class User < ApplicationRecord
  has_secure_password
  has_many :recipes
  has_many :meals, -> { distinct }, through: :recipes

  validates :username, uniqueness: true
  validates :username, length: { in: 4..20 }

  # method that returns distinct meals with their recipes nested in them
  def recipe_by_meals
    organized_recipes = {}

    meals.each do |meal|
      organized_recipes[meal.name] ||= []
    end

    recipes.each do |recipe|
      organized_recipes[recipe.meal_type] << recipe
    end

    organized_recipes
  end
end
