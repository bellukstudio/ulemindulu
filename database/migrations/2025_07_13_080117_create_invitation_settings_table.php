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
        Schema::create('invitation_settings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->text('description')->default('Tanpa Mengurangi Rasa Hormat. Kami Bermaksud Mengundang Bapak/Ibu/Saudara/i Untuk Hadir pada Acara Berikut:');
            $table->foreignUuid('order_id')->constrained('orders')->cascadeOnDelete();
            $table->foreignUuid('invitation_template_id')->constrained('invitation_templates')->cascadeOnDelete();
            $table->date('event_date');
            $table->time('event_time');
            $table->string('timezone');
            $table->text('address', 500);
            $table->text('location')->nullable();
            $table->string('backsound')->nullable();
            $table->json('custom_data')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitation_settings');
    }
};
