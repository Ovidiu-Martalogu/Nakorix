<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Device;

use Illuminate\Http\JsonResponse;


class DeviceController extends Controller
{
    public function index()
    {
        return Device::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'ip' => 'required|string|max:255',
            'mac' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        $device = Device::create($request->all());
        return response()->json($device, 201);
    }

    public function update(Request $request, int $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'ip' => 'required|string|max:255',
            'mac' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'status' => 'required|string|max:255',
        ]);

        $device = Device::findOrFail($id);

        $device->update($request->all());

        return response()->json($device);
    }

    public function destroy(int $id)
    {
        $device = Device::findOrFail($id);

        $device->delete();

        return response()->json([
            'message' => 'Device deleted successfully'
        ]);
    }

    public function discover(): JsonResponse
    {
        $script = base_path('scripts/device-discovery.ps1');

        if (!file_exists($script)) {
            return response()->json([
                'message' => 'Device discovery script not found.'
            ], 500);
        }

        $command = 'powershell.exe -NoProfile -ExecutionPolicy Bypass -File '
            . escapeshellarg($script);

        $output = shell_exec($command);

        if ($output === null) {
            return response()->json([
                'message' => 'Unable to run device discovery.'
            ], 500);
        }

        $devices = json_decode(trim($output), true);

        if (!is_array($devices)) {
            return response()->json([
                'message' => 'Invalid device discovery response.'
            ], 500);
        }

        return response()->json($devices);
    }
}
