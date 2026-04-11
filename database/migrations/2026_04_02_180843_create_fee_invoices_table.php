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
        Schema::create('fee_invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->casacadeOnDelete();
            $table->foreignId('fee_allocation_id')->constrained()->casacadeOnDelete();
            $table->decimal('total_amount', 10,2);
            $table->decimal('paid_amount', 10,2);
            $table->date('due_date');
            $table->enum('status', ['paid', 'partial', 'pending']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_invoices');
    }
};
