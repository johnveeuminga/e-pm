<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    use HasFactory;
    
    /**
     * Gets all the options
     * 
     */
    public function questionOptions()
    {
        return $this->hasMany(QuestionOptions::class, 'question_id', 'id');
    }

    /**
     * Gets all the attempts.
     */
    public function attempts()
    {
        return $this->hasMany(QuestionAttemptAnswer::class, 'question_id', 'id');
    }

    /**
     * Gets all the user attemps.
     */
    public function userAttempts($user_id)
    {
        return $this->attempts()->where(function(Builder $query) use ($user_id) {
            $query->where('user_id', $user_id);
        });
    }


    public function isCompletedByUser($user_id)
    {
        $answer = $this->questionOptions()
                    ->where('is_correct', 1)
                    ->first();

        $condition = $this->max_attempts <= $this->userAttempts($user_id)->count() ||
            in_array($answer->id, $this->userAttempts($user_id)->get()->pluck('answer')->toArray()) ||
            in_array($answer->name, $this->userAttempts($user_id)->get()->pluck('answer')->toArray());

        return $condition;
    }
}
