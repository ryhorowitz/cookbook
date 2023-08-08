require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "GET /show" do
    it "returns http success" do
      get "/user/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/user/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/user/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/user/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
