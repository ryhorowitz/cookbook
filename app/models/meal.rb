class Meal < ApplicationRecord
  has_many :recipes

  validates :name, uniqueness: true
end
