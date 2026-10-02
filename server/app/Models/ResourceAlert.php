<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResourceAlert extends Model
{

    public $timestamps = false;
    protected $fillable = [
        'type',
        'process_name',
        'pid',
        'cpu_usage',
        'memory_usage_mb',
        'severity',
        'message',
        'detected_at',
    ];
}
