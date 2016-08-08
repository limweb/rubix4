<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use App\Todo;

class TodoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		DB::table('todos')->delete();

        Todo::create([
        	"todo" => "Prepare new Billing format",
        	"completed" => false
        ]);

        Todo::create([
        	"todo" => "Create benefits presentation",
        	"completed" => false
        ]);

        Todo::create([
        	"todo" => "Prepare productivity report",
        	"completed" => false
        ]);

        Todo::create([
        	"todo" => "Review non-exempt evaluations",
        	"completed" => true
        ]);

        Todo::create([
        	"todo" => "Update insurance information",
        	"completed" => false
        ]);
    }
}
