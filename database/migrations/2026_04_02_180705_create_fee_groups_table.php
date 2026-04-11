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
        Schema::create('fee_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json('fee_type');
            $table->timestamps();
        });
        Schema::create('fee_group_type', function (Blueprint $table) {
            $table->foreignId('fee_group_id')->constrains()->cascadeOnDelete();
            $table->foreignId('fee_type_id')->constrains()->cascadeOnDelete();
        });
        Schema::create('fee_group_student', function (Blueprint $table) {
            $table->foreignId('fee_group_id')->constrains()->cascadeOnDelete();
            $table->foreignId('student_id')->constrains()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_groups');
    }
};
