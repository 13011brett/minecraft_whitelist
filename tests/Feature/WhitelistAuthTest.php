<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class WhitelistAuthTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_users_cannot_access_whitelist_when_unauthenticated(): void
    {
        $response = $this->get('/whitelists');

        $response->assertRedirect('/login');
    }
    public function test_users_can_access_whitelist_when_authenticated(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/whitelists');

        $response->assertStatus(200);
    }
}
