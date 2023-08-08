class Recipe < ApplicationRecord
  belongs_to :user
  belongs_to :meal

  validates :title, presence: true
  validates :description, presence: true
end
