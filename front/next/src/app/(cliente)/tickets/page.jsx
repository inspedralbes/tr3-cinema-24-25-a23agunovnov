'use client'

import SearchComp from "@/components/SearchComp"

export default function Tickets() {
    return <>
        <SearchComp />
        <div className="min-h-screen bg-[#1a1a1a] text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Mis Tickets</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockTickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            <div className="relative h-48">
                                <img
                                    src={ticket.imageUrl}
                                    alt={ticket.movieTitle}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <h2 className="text-2xl font-bold">{ticket.movieTitle}</h2>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                        <span>{ticket.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-5 w-5 text-gray-400" />
                                        <span>{ticket.time}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                        <span>{ticket.theater}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Film className="h-5 w-5 text-gray-400" />
                                        <span>Asiento {ticket.seat}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-700 pt-4 mt-4">
                                    <div className="flex justify-center">
                                        <img
                                            src={ticket.qrCode}
                                            alt="QR Code"
                                            className="w-32 h-32 rounded-lg"
                                        />
                                    </div>
                                    <p className="text-center text-sm text-gray-400 mt-2">
                                        Muestra este código QR en la entrada
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
}