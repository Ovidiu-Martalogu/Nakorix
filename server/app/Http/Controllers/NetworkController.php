<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class NetworkController extends Controller
{
    public function index(): JsonResponse
    {
        $script = base_path('scripts/network-info.ps1');

        $output = shell_exec(
            'powershell.exe -NoProfile -ExecutionPolicy Bypass -File "' . $script . '"'
        );

        if (!$output) {
            return response()->json([
                'message' => 'Unable to read network configuration.'
            ], 500);
        }

        $network = json_decode(trim($output), true);

        if (!$network) {
            return response()->json([
                'message' => 'Unable to parse network configuration.'
            ], 500);
        }

        return response()->json($network);
    }
}
