class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def renderHTML(props)
    response = props
    response[:path] = request.path
    @rubix_data = "#{response.to_json}".html_safe

    static_response = { data: props }
    static_response[:path] = request.path
    render component: 'StaticComponent', props: static_response, tag: 'div', id: 'app-container'
  end
end
