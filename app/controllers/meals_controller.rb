class MealsController < ApplicationController
  def index
    meals = Meal.all
    render json: meals, status: :ok
  end

  def show
    # ROUTE `/meals/:id/recipes`
    # user = current_user
    # meal = Meal.find_by(id: params[:id])
  end

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
