<?php

namespace Database\Factories;

use App\Models\WhitelistUser;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Whitelist>
 */
class WhitelistFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate a whitelist with 5 users within it. Store as JSON.
        // Associate to random users as well. Should be fine in this case, but
        // would want more protections if this app was going to more than this.
        return [
            'users' => json_encode(WhitelistUser::factory(5)->make()),
            'friendly_name' => fake()->domainName(),
            'user_id' => \App\Models\User::inRandomOrder()->first()->id,
        ];
    }
}
