require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RailsSeed
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.rubix = {
      direction: 'ltr'
    }
    config.generators.stylesheets = false
    config.generators.javascripts = false

    config.react.server_renderer = React::ServerRendering::SprocketsRenderer

    config.react.addons = true

    config.assets.paths << Rails.root.join("public")
  end
end
