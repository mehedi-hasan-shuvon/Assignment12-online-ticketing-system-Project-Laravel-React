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
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->integer('from_location_id');
            $table->integer('to_location_id');
            $table->foreign('from_location_id')->references('location_id')->on('locations');
            $table->foreign('to_location_id')->references('location_id')->on('locations');
            $table->date('trip_date');
            $table->time('departure_time');
            $table->time('arrival_time');
            $table->integer('fare');
            $table->enum('trip_status', ['forward', 'reverse']);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
