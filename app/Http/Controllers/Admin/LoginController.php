<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/Login');
    }

    public function store(Request $request)
    {
        $credentials = $request->validate([
            'login' => ['required', 'string'],
            'password' => ['required'],
        ]);

        // 查找用户（通过username或email）
        $admin = \App\Models\Admin::findByUsernameOrEmail($credentials['login']);

        if ($admin && \Illuminate\Support\Facades\Hash::check($credentials['password'], $admin->password)) {
            Auth::guard('admin')->login($admin, $request->boolean('remember'));
            $request->session()->regenerate();

            return redirect()->intended(route('admin.dashboard'))->with('success', 'Login successful!');
        }

        return redirect()->route('admin.login')->withErrors([
            'login' => 'The provided credentials do not match our records.',
        ])->onlyInput('login')->with('error', 'Invalid credentials.');
    }

    public function destroy(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('admin.login')->with('success', 'Logged out successfully!');
    }
}
