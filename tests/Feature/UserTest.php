<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_user()
    {
        $response = $this->post('/users', [
            'name' => 'testuser',
            'email' => 'test@example.com',
            'gender' => 'male',
            'birthdate' => '2000-01-01',
        ]);

        $response->assertRedirect('/users');
        $this->assertDatabaseHas('users', [
            'name' => 'testuser',
            'email' => 'test@example.com',
            'gender' => 'male',
            'birthdate' => '2000-01-01',
        ]);
    }

    /** @test */
    public function it_can_read_users()
    {
        $user = User::factory()->create();

        $response = $this->get('/users');

        $response->assertStatus(200);
        $response->assertSee($user->name);
    }

    /** @test */
    public function it_can_update_a_user()
    {
        $user = User::factory()->create();

        $response = $this->put("/users/{$user->id}", [
            'name' => 'user',
            'email' => 'user@example.com',
            'gender' => 'female',
            'birthdate' => '0001-01-01',
        ]);

        $response->assertRedirect('/users');
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'user',
            'email' => 'user@example.com',
            'gender' => 'female',
            'birthdate' => '0001-01-01',
        ]);
    }

    /** @test */
    public function it_can_delete_a_user()
    {
        $user = User::factory()->create();

        $response = $this->delete("/users/{$user->id}");

        $response->assertRedirect('/users');
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }
}
