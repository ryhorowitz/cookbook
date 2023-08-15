class RecipesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :recipe_not_found
  def index
    # current user recipes where meal.id is ...
    user = current_user
    recipes = user.recipes.where('meal_id = ?', params[:id])
    render json: recipes, status: :ok
  end

  def show; end

  def create
    recipe = current_user.recipes.create!(recipe_params)
    render json: recipe, status: :created
  end

  def update
    recipe = find_recipe
    recipe.update!(recipe_params)
    render json: recipe, status: :ok
  end

  def destroy
    recipe = find_recipe
    recipe.destroy
    head :no_content
  end

  private

  def recipe_params
    params.permit(:id, :name, :title, :description, :meal_id)
  end

  def find_recipe
    Recipe.find(params[:id])
    # come off the current_user.recipes
  end

  def recipe_not_found
    render json: { message: 'Recipe not found' }, status: :not_found
  end
end
