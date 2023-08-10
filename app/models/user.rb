class User < ApplicationRecord
  has_secure_password
  has_many :recipes
  has_many :meals, -> { distinct }, through: :recipes

  validates :username, uniqueness: true
  validates :username, length: { in: 4..20 }

  # method that returns distinct meals with their recipes nested in them
end
