class WelcomeController < ApplicationController
  def index
    renderHTML message: { echo: "Hello, World!" }
  end
end
