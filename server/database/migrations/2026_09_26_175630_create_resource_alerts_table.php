<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('resource_alerts', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('process_name');
            $table->unsignedInteger('pid')->nullable();
            $table->decimal('cpu_usage', 5, 2)->nullable();
            $table->decimal('memory_usage_mb', 10, 2)->nullable();
            $table->string('severity');
            $table->text('message');
            $table->timestamp('detected_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resource_alerts');
    }
};
