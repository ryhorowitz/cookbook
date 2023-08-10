class RecipesController < ApplicationController
  def index
    # current user recipes where meal.id is ...
    user = current_user
    recipes = user.recipes.where('meal_id = ?', params[:id])
    # byebug
    render json: recipes, status: :ok
  end

  def show; end

  def create
    recipe = User.recipes.create(recipe_params)
    # byebug
  end

  def update; end

  def destroy; end

  private

  def recipe_params
    params.permit(:id, :name, :title, :description)
  end
end
