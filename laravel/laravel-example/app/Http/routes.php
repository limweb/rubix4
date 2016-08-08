<?php

/*
|--------------------------------------------------------------------------
| Dingo API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the API routes for an application.
| You will later just reuse these API routes in your regular routes via an
| instance of the Dingo internal API dispatcher. This creates a consumable
| API allowing for reuse of application logic.
|
*/

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
	$api->get('todos', 'App\Http\Controllers\TodoController@index');
	$api->post('todos', 'App\Http\Controllers\TodoController@store');
	$api->get('todos/{id}', 'App\Http\Controllers\TodoController@show');
	$api->put('todos/{id}', 'App\Http\Controllers\TodoController@update');
	$api->delete('todos/{id}', 'App\Http\Controllers\TodoController@destroy');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
	$dispatcher = app('Dingo\Api\Dispatcher');
	$data = [ "todos" => $dispatcher->version('v1')->get('todos') ];
  	$content = React::renderMarkup([ "path" => '/',
  									 "data" => $data ]);

    return view('index', [ "content" => $content,
                 		   "data" => json_encode($data) ]);
});

Route::get('/todos/{id}', function ($id) {
	$dispatcher = app('Dingo\Api\Dispatcher');
	$data = [ "todo" => $dispatcher->version('v1')->get('todos/'.$id) ];
	$content = React::renderMarkup([ "path" => "/todos/".$id,
									 "data" => $data ]);

	return view('index', [ "content" => $content,
						   "data" => json_encode($data) ]);
});

// Catch-All Route
Route::get('{path}', function ($path) {
	$data = "";
  	$content = React::renderMarkup([ "path" => $path, "data" => $data ]);

    return view('index', [ "content" => $content,
                 		   "data" => json_encode($data) ]);
})->where('path', '(.*)');
