<?php

namespace App\Models;

use App\States\UserState;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\ModelStates\HasStates;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes, HasStates;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'users';
    protected $fillable = [
        'name',
        'email',
        'gender',
        'birthdate',
        'password',
        'state',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'remember_token',
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
        'birthdate' => 'date:Y-m-d',
        'state' => UserState::class,
        'deleted_at' => 'datetime',
    ];

    /**
     * Get the user's gender with the first letter capitalized.
     *
     * @return string
     */
    protected $dates = ['deleted_at'];

    public function getGenderAttribute($value)
    {
        return ucfirst($value);
    }
}
