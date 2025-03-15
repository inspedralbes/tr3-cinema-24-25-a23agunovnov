'use client'

import SearchComp from "@/components/SearchComp"
import { showTickets } from "@/app/plugins/communicationManager"
import { useEffect, useState } from "react"

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const data = await showTickets();
            for (let index = 0; index < data.data.length; index++) {
                data.data[index].seats = JSON.parse(data.data[index].seats);
            }
            setTickets(data);
            setLoading(false);
        })();
    }, []);
    return <>
        <div className="min-h-screen bg-[#1a1a1a] text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Mis Tickets</h1>

                {!loading ?
                    (
                        tickets.data.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {tickets.data.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                                    >
                                        <div className="relative h-48">
                                            {/* <img
                                                src={ticket.imageUrl}
                                                alt={ticket.movieTitle}
                                                className="w-full h-full object-cover"
                                            /> */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                            <div className="absolute bottom-4 left-4">
                                                <h2 className="text-2xl font-bold">{ticket.sessions.title}</h2>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                {/* Fecha de la sesión */}
                                                <div className="flex items-center space-x-2">
                                                    {/* <Calendar className="h-5 w-5 text-gray-400" /> */}
                                                    <span>{ticket.sessions.date}</span>
                                                </div>

                                                {/* Hora de la sesión */}
                                                <div className="flex items-center space-x-2">
                                                    {/* <Clock className="h-5 w-5 text-gray-400" /> */}
                                                    <span>{ticket.sessions.time}</span>
                                                </div>

                                                {/* Sala */}
                                                <div className="flex items-center space-x-2">
                                                    {/* <MapPin className="h-5 w-5 text-gray-400" /> */}
                                                    <span>{ticket.sala}</span>
                                                </div>

                                                {/* Asientos */}
                                                <div className="flex items-center space-x-2 col-span-2">
                                                    {/* <Film className="h-5 w-5 text-gray-400" /> */}
                                                    <span>Asientos:</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {ticket.seats.map((seat, index) => (
                                                            <span key={index} className="bg-gray-700 px-2 py-1 rounded-lg text-sm">
                                                                {seat.id}, Fila {seat.row}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Código QR */}
                                            <div className="border-t border-gray-700 pt-4 mt-4">
                                                <div className="flex justify-center">
                                                    {/* <img
                                                        src={ticket.qrCode}
                                                        alt="QR Code"
                                                        className="w-32 h-32 rounded-lg"
                                                    /> */}
                                                </div>
                                                <p className="text-center text-sm text-gray-400 mt-2">
                                                    Muestra este código QR en la entrada
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <h1>No se encuentran resultados</h1>
                        )
                    ) : (
                        <h1>Cargando resultados</h1>
                    )
                }
            </div>
        </div>
    </>
}