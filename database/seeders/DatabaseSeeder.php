<?php

namespace Database\Seeders;

use App\Imports\UserImport;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Maatwebsite\Excel\Facades\Excel;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        if(App::environment('local')) {
            \App\Models\Modules::factory(4)->create();
            // \App\Models\User::factory(10)->create();
            \App\Models\Lessons::factory(4)->create();
            \App\Models\Tasks::factory(4)->create();
            \App\Models\Questions::factory(4)
                ->has(
                    \App\Models\QuestionOptions::factory()
                        ->count(3)
                        ->state( function( array $attributes, \App\Models\Questions $question) {
                            return [
                                'question_id' => $question->id
                            ];
                        })
                )->create();
        }

        Excel::import(new UserImport, public_path('users.xlsx'));
    }
}
