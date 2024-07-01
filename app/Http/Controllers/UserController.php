<?php

namespace App\Http\Controllers;

use App\Http\Requests\BaseUserRequest;
use App\Models\User;
use App\States\Active;
use App\States\Banned;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {

        return Inertia::render('Users/Index', ['users' => User::withTrashed()->get()]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(BaseUserRequest $request)
    {
        // Retrieve the validated input data...
        User::create($request->validated());

        return redirect(route('users.index'));

    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', ['user' => $user]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(BaseUserRequest $request, User $user)
    {
        $user->update($request->validated());

        return redirect(route('users.index'));
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect(route('users.index'));
    }

    public function ban($id)
    {
        $user = User::findOrFail($id);
        $user->state->transitionTo(Banned::class);

        return redirect(route('users.index'));
    }

    public function unban($id)
    {
        $user = User::findOrFail($id);
        $user->state->transitionTo(Active::class);

        return redirect(route('users.index'));
    }

    public function restore($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();

        return redirect(route('users.index'));
    }

    public function forceDelete($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->forceDelete();

        return redirect(route('users.index'));
    }
}
