<?php

use App\Models\User;
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
        // From a design approach, this is a bit basic -- In the future would want to
        // make it possibly all stored in json and have an associated key to a related user.

        Schema::create('whitelists', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('friendly_name')->nullable();
            $table->json('users');
            $table->timestamps();
            $table->foreignIdFor(User::class);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whitelists');
    }
};
