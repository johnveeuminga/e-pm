<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ModuleLessonsController;
use App\Http\Controllers\QuestionAttemptController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

Route::group([
    'prefix' => 'dashboard'
], function() {
    Route::get('/', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

    Route::group([
        'prefix' => 'module',
    ], function() {
        Route::group([
            'prefix' => '{module}'
        ], function() {
            Route::get('/', [ModuleController::class, 'show'])
                ->name('module.single');

            Route::get('/synthesis', [ModuleController::class, 'synthesis'])
                ->name('module.synthesis');

            Route::group([
                'prefix' => 'lessons'
            ], function() {
                Route::get('/{lesson}', [ModuleLessonsController::class, 'show'])
                    ->name('module.lesson.single')
                    ->scopeBindings();

                Route::get('/{lesson}/task/{task}', [ModuleLessonsController::class, 'showTask'])
                    ->name('module.lesson.task.single')
                    ->scopeBindings();
            });
        });
    });

});

Route::group([
    'prefix' => 'question'
], function() {
    Route::post('{question}/attempt', [QuestionAttemptController::class, 'attempt'])
        ->name('question.attempt');
});

require __DIR__.'/auth.php';
