<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    //
    public function store(Request $request)
    {
        $log = new Log;

        $log->user_id = $request->user;
        $log->url = $request->url;

        $log->save();

        return response($log);
    }
}
