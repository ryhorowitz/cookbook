class Recipe < ApplicationRecord
  belongs_to :user
  belongs_to :meal

  validates :title, presence: true
  validates :description, presence: true

  def meal_type
    meal.name
  end
end
