<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    use HasFactory;
    /**
     * 
     */
    protected $hidden = ['synthesis_media_url'];

    /**
     * Gets all the lessons for the module
     * 
     */    
    public function lessons()
    {
        return $this->hasMany(Lessons::class, 'module_id', 'id');
    }
}
