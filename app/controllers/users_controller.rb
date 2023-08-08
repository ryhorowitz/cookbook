class UsersController < ApplicationController
  def show
    render json: current_user
  end

  def create; end

  def update; end

  def destroy; end
end
