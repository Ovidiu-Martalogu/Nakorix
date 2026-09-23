<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use App\Services\LogService;

class LogController extends Controller
{
    public function index(): JsonResponse
    {
        $logs = Log::orderBy('created_at', 'desc')->get();

        return response()->json($logs);
    }

   public function store(Request $request, LogService $logService): JsonResponse
{
    $validated = $request->validate([
        'module' => 'required|string|max:255',
        'event' => 'required|string|max:255',
        'severity' => 'nullable|string|max:50',
        'message' => 'nullable|string',
    ]);

    $log = $logService->create(
        $validated['module'],
        $validated['event'],
        $validated['severity'] ?? 'info',
        $validated['message'] ?? null
    );

    return response()->json($log, 201);
}
}
