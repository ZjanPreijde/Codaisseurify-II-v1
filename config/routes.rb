Rails.application.routes.draw do
  root to: 'pages#home'

  resources :artists do
    resources :songs
  end

  get '/bootstrap', to: 'pages#bootstrap', as: 'bootstrap'

end

# API setup
Rails.application.routes.draw do
  # rest of the code...

  namespace :api do
    resources :songs
  end
end
