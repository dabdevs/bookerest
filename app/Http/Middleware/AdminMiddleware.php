<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user(); 

        if (!$user || !$user->hasRole('admin')) {
            // Check if the request expects a JSON response (e.g., an API request)
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Unauthorized.'], 403);
            }

            // For web requests, redirect to a specific page with an error message
            return redirect('dashboard')->with('error', 'You do not have admin access.');
        }

        return $next($request);
    }
}
