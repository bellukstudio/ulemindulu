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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('client_id')->constrained('register_clients')->cascadeOnDelete();
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->string('midtrans_order_id')->nullable();
            $table->date('order_date');
            $table->foreignUuid('invitation_template_id')->constrained('invitation_templates')->cascadeOnDelete();
            $table->json('template_data');
            $table->string('subdomain')->unique();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
