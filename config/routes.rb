Rails.application.routes.draw do
  root to: 'pages#home'

  resources :artists do
    resources :songs
  end

  get '/bootstrap', to: 'pages#bootstrap', as: 'bootstrap'

  # resources :artists do
  # end

  # Does not do anything extra?
  # get 'pages/home'
end
