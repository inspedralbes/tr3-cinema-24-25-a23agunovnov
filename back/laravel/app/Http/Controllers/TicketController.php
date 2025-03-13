<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();

            $tickets = Ticket::where('ID_user', $user->id)->with('sessions:id,title,imdb,time,date')->orderBy('created_at', 'desc')->get();

            if (!$tickets) {
                return response()->json(['success' => false, 'message' => 'We have a problem'], 500);
            }

            if ($tickets->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'No se encontraron tickets.',
                    'data' => []
                ], 200);
            }

            return response()->json([
                'success' => true,
                'data' => $tickets
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al obtener los tickets.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAll()
    {
        try {
            $user = Auth::user();
            
            if ($user) {
                $tickets = Ticket::orderBy('created_at', 'desc')->get();

                if (!$tickets) {
                    return response()->json(['success' => false, 'message' => 'We have a problem'], 500);
                }

                if ($tickets->isEmpty()) {
                    return response()->json([
                        'success' => true,
                        'message' => 'No se encontraron tickets.',
                        'data' => []
                    ], 200);
                }

                // return response()->json([
                //     'success' => true,
                //     'data' => $tickets
                // ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Usuario no autenticado',
                    'data' => []
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al obtener los tickets.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            $validated = $request->validate([
                'ID_session' => 'required|integer|exists:session_movies,id',
                'sala' => 'string|nullable',
                'seats' => 'required|json',
                'total' => 'required|numeric'
            ]);

            $ticket = Ticket::create([
                'ID_user' => $user->id,
                'ID_session' => $validated['ID_session'],
                'sala' => $validated['sala'],
                'seats' => $validated['seats'],
                'total' => $validated['total']
            ]);

            if (!$ticket) {
                return response()->json(['success' => false, 'message' => 'We have a problem'], 500);
            }

            return response()->json(['success' => true, 'data' => $ticket], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'We have a problem try-catch: ' . $e->getMessage()], 500);
        }
    }

    public function show(Ticket $ticket)
    {
        //
    }

    public function edit(Ticket $ticket)
    {
        //
    }

    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    public function destroy(Ticket $ticket)
    {
        //
    }
}
