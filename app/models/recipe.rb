class Recipe < ApplicationRecord
  belongs_to :user
  belongs_to :meal

  validates :title, presence: true
  validates :description, presence: true

  def meal_type
    meal.name
  end

  def truncated
    {
      id: self[:id],
      title: self[:title],
      description: self[:description]
    }
  end
end
