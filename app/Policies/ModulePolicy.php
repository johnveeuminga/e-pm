<?php

namespace App\Policies;

use App\Models\Modules;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ModulePolicy
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
     * Determines if user can access synthesis
     * 
     * @param App\Models\User $user
     * @param App\Models\Modules $module
     * 
     * @return \Illuminate\Auth\Access\Response
     */
    public function synthesis(User $user, Modules $module)
    {
        return $module->lessons->every(function($lesson) use ($user) {
            return $lesson->userCompleted($user) == true;
        });
    }
}
