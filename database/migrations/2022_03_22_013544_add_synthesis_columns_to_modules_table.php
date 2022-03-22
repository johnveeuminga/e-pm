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
        Schema::table('modules', function (Blueprint $table) {
            //
            $table->longText('synthesis_content')->nullable();
            $table->text('synthesis_short_text')->nullable();
            $table->string('synthesis_cover_photo_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('modules', function (Blueprint $table) {
            //
            $table->dropColumn('synthesis_content');
            $table->dropColumn('synthesis_short_text');
        });
    }
};
