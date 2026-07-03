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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique(); 
            $table->foreignId('student_id')->constrained('students')->cascadeOnDelete();
            $table->string('description')->nullable(); 
            $table->foreignId('fee_setup_id')->constrained()->cascadeOnDelete();
            $table->decimal('amount_due', 10,2);
            $table->decimal('amount_paid', 10,2)->default(0);
            $table->decimal('balance', 10,2)->default(0);
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
