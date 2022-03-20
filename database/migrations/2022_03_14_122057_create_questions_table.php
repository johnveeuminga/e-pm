<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('question_type_id');
            $table->unsignedInteger('task_id');
            $table->integer('max_attempts')->default(1);
            $table->longText('question');
            $table->string('media_url')->nullable();
            $table->longText('hint_strategy')->nullable();
            $table->longText('hint_tips')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
};
