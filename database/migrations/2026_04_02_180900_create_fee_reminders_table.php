<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void 
    {
        Schema::create('fee_reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('title'); // needed for your React table
            $table->text('message');
            $table->enum('channel', ['sms', 'email', 'app']); // matches controller
            $table->enum('status', ['pending', 'sent', 'failed'])->default('pending');
            $table->unsignedInteger('recipient_count')->default(0);
            $table->dateTime('scheduled_at')->nullable();
            $table->timestamp('sent_at')->nullable(); // when it was actually sent
            $table->timestamps();
        });
    }

    public function down(): void 
    {
        Schema::dropIfExists('fee_reminders');
    }
};
