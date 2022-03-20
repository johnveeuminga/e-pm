<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lessons extends Model
{
    use HasFactory;

    /**
     * Gets the module assigned to this lesson
     */
    public function module()
    {
        return $this->belongsTo(Modules::class, 'module_id', 'id');
    }

    /**
     * Retrieves all the tasks related to the lesson
     */
    public function tasks() 
    {
        return $this->hasMany(Tasks::class, 'lesson_id', 'id');
    }

    /**
     * Checks if user has completed the Lesson
     */
    public function userCompleted($user)
    {
        $ans = $this->tasks->every(function($task) use ($user) {
            return $task->isCompletedByUser($user) == true;
        });

        return $ans;
    }
}
