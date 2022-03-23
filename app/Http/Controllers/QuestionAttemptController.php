<?php

namespace App\Http\Controllers;

use App\Models\QuestionAttempt;
use App\Models\QuestionAttemptAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestionAttemptController extends Controller
{
    /**
     * Attempt a question
     * 
     * @return 
     */
    public function attempt(Request $request)
    {
        $user = Auth::user();

        $question_attempt_answer = new QuestionAttemptAnswer();

        $question_attempt_answer->question_id = $request->question_id;
        $question_attempt_answer->question_option_id = 0;
        $question_attempt_answer->answer = $request->answer;
        $question_attempt_answer->user_id = $user->id;

        $question_attempt_answer->save();

        // dd($question_attempt_answer->question->questionOptions()->where('name',$question_attempt_answer->answer)->first());

        $correct = $this->evaluate($question_attempt_answer);

        return back()->with('message', [
            'correct' => $correct
        ]);

    }

    private function evaluate(QuestionAttemptAnswer $attempt)
    {
        $question = $attempt->question;
        $correct = false;

        $eval = $question->questionOptions()
            ->where(function ($q) use ($attempt) {
                $q->where('id', $attempt->answer)
                ->orWhere('name', $attempt->answer)
                ->orWhereRaw('CAST(name as DECIMAL(10, 3)) = CAST(? as DECIMAL(10, 3))', [$attempt->answer]);
            })
            ->first();

        $correct = $eval && $eval->is_correct;

        return $correct;
    }
}
