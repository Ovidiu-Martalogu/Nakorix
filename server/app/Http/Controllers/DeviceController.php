<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Device;


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

    public function update(Request $request, $id)
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

    public function destroy($id)
    {
        $device = Device::findOrFail($id);

        $device->delete();

        return response()->json([
            'message' => 'Device deleted successfully'
        ]);
    }
}
