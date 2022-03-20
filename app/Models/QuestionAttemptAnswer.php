<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionAttemptAnswer extends Model
{
    use HasFactory;

    /**
     * Retrieves the question related to the attempt.
     * 
     */
    public function question()
    {
        return $this->belongsTo(Questions::class, 'question_id', 'id');
    }
}
