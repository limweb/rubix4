<?php namespace App\Helpers;

use ReactJS;

/**
* React
*/
class React
{
	public static $react;

	public static function init() {
		$defaults_source = file_get_contents(app_path().'/../public/js/defaults.js');
		$server_source = file_get_contents(app_path().'/../public/js/server.js');
		$react_source = file_get_contents(app_path().'/../public/js/react.js').
						file_get_contents(app_path().'/../public/js/react-dom.js').
						file_get_contents(app_path().'/../public/js/react-dom-server.js');
		$app_source = $defaults_source.$server_source;

		self::$react = new ReactJS($react_source, $app_source);
	}

	public static function renderToString($component, $props = null) {
		self::$react->setComponent($component, $props);
		return self::$react->getMarkup();
	}

	public static function renderMarkup($props = null) {
		return self::renderToString('StaticComponent', $props);
	}
}

React::init();
