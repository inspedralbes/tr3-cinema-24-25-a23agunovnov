<?php

namespace App\Http\Controllers;

use App\Models\SessionMovie;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Http\Request;

class SessionMovieController extends Controller implements HasMiddleware
{
    public static function middleware(): array{
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // $sesiones = SessionMovie::where('date', '>=', today())->get();
            $sesiones = SessionMovie::where('date', '>=', today())->get();
            return response()->json(['success' => true, 'data' => $sesiones]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'We have a problem try-catch: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'imdb' => 'required|string',
                'title' => 'required|string',
                'time' => 'required|string',
                'date' => 'required|date'
            ]);

            $seat_id = 0;
            for ($i = 1; $i <= 12; $i++) {
                for ($j = 0; $j < 10; $j++) {
                    $seat_id++;
                    $seat = [
                        'id' => $seat_id,
                        'available' => true,
                        'row' => $i
                    ];
                    $seats[] = $seat;
                }
            }

            $session = SessionMovie::create([
                'imdb' => $validated['imdb'],
                'title' => $validated['title'],
                'time' => $validated['time'],
                'date' => $validated['date'],
                'seats' => json_encode($seats)
            ]);

            if (!$session) {
                return response()->json(['success' => false, 'message' => 'We have a problem'], 500);
            }

            return response()->json(['success' => true, 'data' => $session], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'We have a problem try-catch: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $imdbID)
    {
        $session = SessionMovie::where('imdb', $imdbID)->get()->first();
        return response()->json(['success' => true, 'data' => $session], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SessionMovie $session)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $imdbID)
    {
        try {
            $session = SessionMovie::where('imdb', $imdbID)->get()->first();
            $session->seats = $request->seats;
            $session->save();

            return response()->json(['success' => true, 'message' => $session], 200);

        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => 'We have a problem try-catch: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SessionMovie $session)
    {
        //
    }
}
