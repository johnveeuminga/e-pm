<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;

    public function questions()
    {
        return $this->hasMany(Questions::class, 'task_id', 'id');
    }

    /**
     * Gets the parent task
     */
    public function parent()
    {
        return $this->hasOne(Tasks::class, 'id', 'parent_id');
    }

    /**
     * Gets the is completed attribute
     * 
     * @param string $user_id
     * 
     * @return bool
     */
    public function isCompletedByUser($user)
    {
        $ans = $this->questions->every(function($question, $key) use ($user) {
            return $question->isCompletedByUser($user->id);
        });

        return $ans;
    }
}
