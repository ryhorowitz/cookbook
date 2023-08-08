class Recipe < ApplicationRecord
  belongs_to :user
  belongs_to :meal
end
