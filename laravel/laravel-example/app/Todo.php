<?php

namespace App;

use Validator;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
	private $errors;

	private $rules = array(
		'todo' => 'required',
		'completed' => 'required'
	);

    protected $fillable = array('todo', 'completed');

    public function validate($data)
    {
    	$v = Validator::make($data, $this->rules);

    	if ($v->fails())
    	{
    	    $this->errors = $v->errors();
    	    return false;
    	}

    	return true;
    }

    public function errors()
    {
        return $this->errors;
    }
}
