<?php

namespace App\Http\Controllers;

use App\Models\Lessons;
use App\Models\Modules;
use App\Models\QuestionAttemptAnswer;
use App\Models\Tasks;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ModuleLessonsController extends Controller
{
    /**
     * Creates a new ModuleLessonsController instance
     * 
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    } 

    /**
     * Gets the lesson
     * 
     * @return \Inertia\Response
     */
    public function show(Modules $module, Lessons $lesson)
    {
        $lesson = $lesson->load([
            'module:id,name', 
            'tasks:id,name,lesson_id'
        ]);

        return Inertia::render('Module/Lesson', [
            'lesson' => $lesson,
        ]);
    }


    /**
     * Gets the lesson task
     * 
     * @return \Inertia\Response
     */
    public function showTask(Request $request, Modules $module, Lessons $lesson, Tasks $task)
    {
        $user = Auth::user();

        $gate = $this->checkIfCanViewTask($task);
        $lesson = $lesson->load(['module:id,name', 'tasks:id,name,lesson_id']);

        if($gate->denied()) {
            return Inertia::render('Module/Lesson', [
                'lesson' => $lesson,
                'not_allowed' => true,
                'message' => $gate->message(),
                'code' => $gate->code(),
                'selected_task_id' => $task->id,
            ]); 
        }

        $questions = $task->questions()
            ->select([
                'questions.*',
            ])
            ->with([
                'attempts' => function($q) use ($user) {
                    $q->where('user_id', $user->id);
                },
                'questionOptions' => function($q) use ($user) {

                    $questions_table = DB::table('questions')
                        ->selectRaw('questions.*, CASE WHEN true THEN 1 ELSE 0 END as `should_show_answers`')
                        ->whereIn('id', function($q) use ($user){
                            $q->select('question_id')
                                ->fromSub(function($q) use ($user) {
                                $q->from('question_attempt_answers')
                                    ->selectRaw('question_id, max_attempts, count(*) as count')
                                    ->where('user_id', $user->id)
                                    ->join('questions', 'questions.id', '=', 'question_attempt_answers.question_id')
                                    ->groupBy('question_id');
                            }, 'attempts_count')
                            ->whereRaw("count >= max_attempts");
                        })
                        ->orWhereIn('id', function($q) use ($user) {
                            $correct_answers_join_sub = DB::table('questions')
                                ->select('questions.id as qa_id', 'question_options.question_id', 'question_options.id as qo_id', 'name', 'is_correct')
                                ->crossJoin('question_options', 'question_options.question_id', '=', 'questions.id')
                                ->where('is_correct', 1);

                            $q->from('question_attempt_answers') 
                                ->select('question_attempt_answers.question_id')
                                ->joinSub($correct_answers_join_sub, 'QA', function($join){
                                    $join->on('QA.qo_id', '=', 'question_attempt_answers.answer')
                                        ->orOn('QA.name', '=', 'question_attempt_answers.answer')
                                        ->orOn(DB::raw('CAST(QA.name as DECIMAL(10, 2))'), '=', DB::raw('CAST(question_attempt_answers.answer as DECIMAL(10, 3))'));
                                })
                                ->where('user_id', $user->id);
                        });
                        

                    $q->selectRaw('question_options.id, name, question_options.question_id, CASE WHEN should_show_answers THEN is_correct ELSE 0 END as `show_correct`')
                        ->leftJoinSub($questions_table, 'qta', function($join) {
                            $join->on('qta.id', '=', 'question_options.question_id');
                        });
                }
            ])
            ->get();

        return Inertia::render('Module/Lesson', [
            'lesson' => $lesson,
            'task' => $task,
            'questions' => $questions,
            'selected_task_id' => $task->id,
        ]);
    }

    /**
     * Checks if the user is allowed to view the task
     * 
     * @param Tasks $task
     * 
     * @return \Illuminate\Auth\Access\Response
     */
    public function checkIfCanViewTask(Tasks $task)
    {
        return Gate::inspect('get', $task);
    }
}
