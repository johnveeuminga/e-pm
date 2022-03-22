<?php

namespace App\Http\Controllers;

use App\Imports\UserImport;
use App\Models\Modules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ModuleController extends Controller
{
    /**
     * Gets all the modules.
     * 
     * @return \Intertia\Response
     */
    public function index() {
        Excel::import(new UserImport, public_path('users.xlsx'));
    }

    /**
     * Displays a single module.
     * 
     * @return \Intertia\Response
     */
    public function show(Modules $module)
    {
        return Inertia::render('Module/Module', [
            'module' => $module,
            'lessons' => $module->lessons->load('tasks'),
        ]);
    }

    /**
     * Shows the synthesis view.
     * 
     * @reutrn \Inertia\Response
     */
    public function synthesis(Request $request, Modules $module)
    {
        // $gate = Gate::inspect('synthesis', $module);

        // if($gate->denied()) {
        //     return Inertia::render('Module/Synthesis', [
        //         'module' => $module,
        //         'not_allowed' => true,
        //     ]);
        // }

        return Inertia::render('Module/Synthesis', [
            'module' => $module->makeVisible(['synthesis_media_url'])
        ]);
    }
}
