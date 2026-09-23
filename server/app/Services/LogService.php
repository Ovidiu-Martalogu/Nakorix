<?php

namespace App\Services;

use App\Models\Log;

class LogService
{
    public function create(
        string $module,
        string $event,
        string $severity = 'info',
        ?string $message = null
    ): Log {
        return Log::create([
            'module' => $module,
            'event' => $event,
            'severity' => $severity,
            'message' => $message,
        ]);
    }
}
