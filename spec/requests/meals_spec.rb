require 'rails_helper'

RSpec.describe "Meals", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/meals/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/meals/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/meals/create"
      expect(response).to have_http_status(:success)
    end
  end

end
