require 'faker'

puts '📃 Seeding data...'
User.create(username: 'rywitz', password: '1234', password_confirmation: '1234')
User.create(username: 'pizzaMan', password: '1234', password_confirmation: '1234')
User.create(username: 'mr.softee', password: '1234', password_confirmation: '1234')
User.create(username: 'celia', password: '1234', password_confirmation: '1234')
User.create(username: 'person5', password: '1234', password_confirmation: '1234')

meal_options = %w[Breakfast Lunch Dinner Snack Dessert]

Meal.create(name: 'Breakfast')
Meal.create(name: 'Lunch')
Meal.create(name: 'Dinner')
Meal.create(name: 'Snack')
Meal.create(name: 'Dessert')

20.times do
  Recipe.create(
    title: Faker::Food.dish,
    description: Faker::Food.description,
    user_id: rand(1..5),
    meal_id: rand(1..5)
  )
  # ethnic_category: Faker::Food.ethnic_category,
  # preparation_time: Faker::Number.between(from: 10, to: 60)
end

puts 'Seed Complete'
