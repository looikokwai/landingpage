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
        Schema::create('game_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_name', 255);
            $table->enum('section_type', ['popular_games', 'jackpot_games', 'live_casino', 'payment_gateway', 'gaming_provider']);
            $table->json('games_data');
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_sections');
    }
};
