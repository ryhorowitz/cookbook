Rails.application.routes.draw do
  resources :recipes, only: %i[index show create update destroy]
  resources :meals, only: %i[index show create]
  resources :users, only: %i[show create update destroy]

  get '/auth', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
