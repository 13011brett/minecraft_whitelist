<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response_on_index(): void
    {
        $response = $this->get('/');
        //Changed since we are doing a redirect to /register now.
        $response->assertStatus(302);
    }
}
