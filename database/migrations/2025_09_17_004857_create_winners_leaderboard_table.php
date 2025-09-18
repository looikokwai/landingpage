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
        Schema::create('winners_leaderboard', function (Blueprint $table) {
            $table->id();
            $table->string('game_name', 255);
            $table->string('player_name', 255);
            $table->decimal('bet_amount', 10, 2);
            $table->string('multiplier', 50);
            $table->decimal('winning_amount', 10, 2);
            $table->enum('category', ['latest_winner', 'high_roller', 'wager_contest']);
            $table->string('background_color', 7)->default('#f5f5f5');
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
        Schema::dropIfExists('winners_leaderboard');
    }
};
