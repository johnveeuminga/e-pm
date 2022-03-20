<?php

namespace App\Http\Controllers;

use App\Models\Modules;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Dashboard',[
            'modules' => Modules::get(['id', 'name', 'media_url']),
        ]);
    }
}
