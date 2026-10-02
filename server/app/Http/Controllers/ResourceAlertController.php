<?php

namespace App\Http\Controllers;

use App\Models\ResourceAlert;

use Illuminate\Http\Request;

class ResourceAlertController extends Controller
{
    public function index()
    {
        return ResourceAlert::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([

            'type' => 'required|string|max:50',
            'process_name' => 'required|string|max:255',
            'pid' => 'nullable|integer|min:0',
            'cpu_usage' => 'nullable|numeric|between:0,100',
            'memory_usage_mb' => 'nullable|numeric|min:0',
            'severity' => 'required|string|max:20',
            'message' => 'required|string',
            'detected_at' => 'nullable|date',



        ]);

        $alert = ResourceAlert::create($validated);

        return response()->json($alert, 201);
    }
}
