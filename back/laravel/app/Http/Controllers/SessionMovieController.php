<?php

namespace App\Http\Controllers;

use App\Models\SessionMovie;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;

class SessionMovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
                'time' => 'required|string'
            ]);

            $seat_id = 0;
            for ($i=1; $i <= 12; $i++) {
                for ($j=0; $j < 10; $j++) { 
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
                'seats' => json_encode($seats)
            ]);

            if(!$session){
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
    public function show(Session $session)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Session $session)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Session $session)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Session $session)
    {
        //
    }
}
