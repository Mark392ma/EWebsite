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
        Schema::create('fee_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->nullable()->constrained()->casacadeOnDelete();
            $table->foreignId('fee_invoice_id')->nullable()->constrained()->casacadeOnDelete();
            $table->string('payment_method');
            $table->decimal('amount', 10, 2);
            $table->date('payment_date');
            $table->string('receipt_number');
            $table->enum('status', ['paid', 'partial', 'pending']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_payments');
    }
};
