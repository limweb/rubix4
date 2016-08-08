<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $is_rtl = env('RUBIX_RTL') == true;
        $dir = $is_rtl ? "main-rtl" : "main";

        view()->share('rubix_dir', $is_rtl ? 'rtl' : 'ltr');

        if (env('APP_ENV') === 'local') {
            view()->share('rubix_devjs', "<script src='http://localhost:8079/assets/js/devServerClient.js'></script>");
            view()->share('rubix_css', "<script src='http://localhost:8079/assets/js/".$dir.".js'></script>");
            view()->share('rubix_plugins', "<script src='http://localhost:8079/assets/js/plugins.js'></script>");
            view()->share('rubix_app', "<script src='http://localhost:8079/assets/js/app.js'></script>");
        } else {
            view()->share('rubix_devjs', "");
            view()->share('rubix_css', "<link rel='stylesheet' href='/css/".$dir.".css' />");
            view()->share('rubix_plugins', "<script src='/js/plugins.js'></script>");
            view()->share('rubix_app', "<script src='/js/app.js'></script>");
        }
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
