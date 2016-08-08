module ApplicationHelper
  def rubix_dir
    return Rails.application.config.rubix[:direction]
  end

  def rubix_assets
    dir = 'main'
    if Rails.application.config.rubix[:direction] == 'rtl'
      dir = 'main-rtl'
    end

    if Rails.env.development?
      return [
        content_tag('script', nil, src: 'http://localhost:8079/assets/js/devServerClient.js').html_safe,
        content_tag('script', nil, src: 'http://localhost:8079/assets/js/'+dir+'.js').html_safe,
        content_tag('script', nil, src: 'http://localhost:8079/assets/js/plugins.js').html_safe,
        content_tag('script', nil, src: 'http://localhost:8079/assets/js/app.js').html_safe
      ].join("\n").html_safe
    end

    return [
      content_tag('link', nil, rel: 'stylesheet', href: '/css/'+dir+'.css'),
      content_tag('script', nil, src: '/js/plugins.js'),
      content_tag('script', nil, src: '/js/app.js')
    ].join("\n").html_safe
  end
end
