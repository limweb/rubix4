<?php

// Catch-All Route
Route::get('{path}', function ($path) {
	$data = "";
  	$content = React::renderMarkup([ "path" => $path, "data" => $data ]);

    return view('index', [ "content" => $content,
                 		   "data" => json_encode($data) ]);
})->where('path', '(.*)');
