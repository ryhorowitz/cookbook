class MealsController < ApplicationController
  skip_before_action :authorized, only: :index
  def index
    meals = Meal.all
    render json: meals, status: :ok
  end

  def create
    meal = Meal.create!(meals_params)
    render json: meal, status: :created
  end

  private

  def meals_params
    params.permit(:name)
  end
end
