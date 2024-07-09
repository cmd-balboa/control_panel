<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUserRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (! $request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // checked role user
        foreach ($roles as $role) {
            if ($request->user()->role === $role) {
                return $next($request);
            }
        }

        return response()->json(['error' => 'Access denied'], 403);
    }
}