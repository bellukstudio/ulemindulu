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
        Schema::create('invitation_templates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('template_name', 100);
            $table->text('description')->nullable();
            $table->string('slug')->unique();
            $table->string('preview_url')->nullable();
            $table->string('folder_path');
            $table->enum('type', ['wedding', 'birthday', 'aqiqah', 'syukuran', 'event'])->default('wedding');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitation_templates');
    }
};
