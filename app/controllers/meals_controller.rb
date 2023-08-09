class MealsController < ApplicationController
  def index
    meals = Meal.all
    render json: meals, status: :ok
  end

  def show; end

  def create
    meal = Meal.create!(meals_params)
    # byebug
    render json: meal, status: :created
  end

  private

  def meals_params
    params.permit(:name)
  end
end
