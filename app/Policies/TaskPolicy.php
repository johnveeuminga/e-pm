<?php

namespace App\Policies;

use App\Models\Tasks;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the user can view the post
     * 
     * @param \App\Models\User $user
     * @param \App\Models\Tasks $task
     * 
     * @return \Illuminate\Auth\Access\Response
     */
    public function get(User $user, Tasks $task)
    {
        if($task->parent_id) {
            $parent = $task->parent;

            return $parent->isCompletedByUser($user)  
                    ? Response::allow()
                    : Response::deny("Please complete {$parent->name} first.", 'ta-001');
        }

        return Response::allow();
    }
}
