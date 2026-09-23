<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class ConnectionController extends Controller
{
    public function index(): JsonResponse
    {
        $script = base_path('scripts/connection-monitor.ps1');

        if (!file_exists($script)) {
            return response()->json([
                'message' => 'Connection monitor script not found.'
            ], 500);
        }

        $command = 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File '
            . escapeshellarg($script);

        $output = shell_exec($command);

        if ($output === null) {
            return response()->json([
                'message' => 'Unable to run connection monitor.'
            ], 500);
        }

        $connections = json_decode(trim($output), true);

        if (!is_array($connections)) {
            return response()->json([
                'message' => 'Invalid connection monitor response.'
            ], 500);
        }

        return response()->json($connections);
    }
}
