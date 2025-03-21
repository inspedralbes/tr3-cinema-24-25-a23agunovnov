"use client";
import { useParams, useRouter } from "next/navigation";
import { getInfoMovie, getSession, comprarTicket } from "@/app/plugins/communicationManager";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import socket from '@/services/socket';

export default function MoviePage() {
    const { imdbID } = useParams();
    const [sesion, setSesion] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [seats, setSeats] = useState(sesion.seats || []);
    const [chooseSeats, setChooseSeats] = useState(false);
    const [clickedSeats, setClickedSeats] = useState([]);
    const [formattedDate, setFormattedDate] = useState('');
    const [loginAuth, setLoginAuth] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            await cargarData();
        })();
    }, []);

    useEffect(() => {
        setFormattedDate(
            new Date(sesion.date).toLocaleDateString('es-ES', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            })
        );
        // console.log("Sesión: ", sesion);
        setSeats(sesion.seats);
        socket.emit('joinRoom', sesion.imdbID);
    }, [sesion.date]);

    async function cargarData() {
        const movie = await getInfoMovie(imdbID);
        // console.log("Response de la infoPeli: ", movie);
        const session = await getSession(imdbID);
        // console.log("Response de la sesión: ", session)
        const info = {
            "imdbID": movie.imdbID,
            "title": movie.Title,
            "year": movie.Year,
            "rated": movie.Rated,
            "released": movie.Released,
            "runtime": movie.Runtime,
            "genre": movie.Genre,
            "director": movie.Director,
            "actors": movie.Actors,
            "plot": movie.Plot,
            "language": movie.Language,
            "poster": movie.Poster,
            "showtime": session.data.time,
            "date": session.data.date,
            "seats": JSON.parse(session.data.seats)
        };
        setSesion(info);
        setClickedSeats([]);
        setSelectedDate('');
        setSelectedTime('');
    }

    function seatSelected(id) {
        return clickedSeats.some((seat) => seat.id === id);
    }

    function calculateTotal() {
        return clickedSeats.length * 6;
    }

    socket.on('newTicket', async (ticket) => {
        const butacas = JSON.parse(ticket.seats);
        setSeats(prevSeats =>
            prevSeats.map(s =>

                butacas.find(b => b.id === s.id)
                    ? { ...s, available: false }
                    : s
            )
        );
    });

    async function comprarEntrada(imdbID) {
        const session = await getSession(imdbID);
        const seats = JSON.parse(session.data.seats);
        let isOk = true;
        clickedSeats.map((asiento) => {
            const trobat = seats.find(seat => seat.id === asiento.id);
            if (trobat && trobat.available) {
                trobat.available = false;
                seats[trobat.id - 1] = trobat;
            } else {
                isOk = false;
            }
        });

        if (isOk) {
            if (localStorage.getItem('token')) {
                const newSeats = clickedSeats.map((seat) => {
                    return {
                        "id": seat.id,
                        "row": seat.row
                    }
                })
                const ticket = {
                    'ID_session': session.data.id,
                    'imdbID': imdbID,
                    'sala': "10A",
                    'seats': JSON.stringify(newSeats),
                    'total': calculateTotal()
                }
                const response = await comprarTicket(imdbID, seats, ticket);
                socket.emit('newTicket', ticket);
                await cargarData();
                Swal.fire({
                    title: "Ticket comprado con éxito",
                    text: "¡Disfruta de la película!",
                    icon: "success",
                    width: 600,
                    padding: "3em",
                    showConfirmButton: true,
                    confirmButtonText: "Ver tickets",
                    confirmButtonColor: "#007BFF", // Azul para el fondo del botón
                    confirmButtonTextColor: "#FFF", // Blanco para el texto del botón
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    cancelButtonColor: "#d33",
                    color: "#000",
                    background: "#fff",
                    backdrop: `
                      rgba(0, 0, 0, 0.42)
                    `
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push('/tickets');
                    }
                });
            } else {
                setLoginAuth(true);
            }
        } else {
            if (confirm("Has seleccionado un asiento ya ocupado, recarga la página")) {
                window.location.replace('');
            };
        }
    }

    return <>
        <div className="w-full h-screen bg-[#1a1a1a] flex justify-center text-white">
            <div className="h-full w-full max-w-7xl">
                {
                    chooseSeats &&
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center" onClick={() => setChooseSeats(false)}>
                        <div className="w-[80rem] bg-white rounded-lg p-8 text-black" onClick={(e) => e.stopPropagation()}>
                            <p className="font-bold text-center mb-5 text-xl">Seleccionar asientos <span className="font-light text-base">(max 10)</span></p>
                            <div className="grid grid-cols-10 gap-2">
                                {seats?.map((seat, index) => (
                                    <div className="flex justify-center" key={seat.id}>
                                        <svg width="2.5em" height="2.5em" viewBox="0 0 167 167" fill="none" xmlns="http://www.w3.org/2000/svg" className={`hover:scale-110 transition ${seat.available ? "cursor-pointer" : "cursor-not-allowed"}`} onClick={() => {
                                            if (seat.available && clickedSeats.length < 10) {
                                                setClickedSeats((prevValue) => {
                                                    if (seatSelected(seat.id)) {
                                                        return prevValue.filter((s) => s.id !== seat.id);
                                                    } else {
                                                        return [...prevValue, seat];
                                                    }
                                                });
                                            }
                                        }}>
                                            <path d="M0 26C0 11.6406 11.6406 0 26 0H141C155.359 0 167 11.6406 167 26V110C167 141.48 141.48 167 110 167H57C25.5198 167 0 141.48 0 110V26Z"
                                                fill={
                                                    seat.available ? (seatSelected(seat.id) ? "#98FF96" : "#D9D9D9") : "#FF0000"
                                                }
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full mt-8">
                                <svg width="100%" height="100px" viewBox="0 0 1005 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M875.564 64H129.436L0 0H1005L875.564 64Z" fill="#D9D9D9" />
                                </svg>
                            </div>

                            <div className="w-full flex justify-center px-5 mt-5">
                                <button className="w-xl bg-red-600 py-3 rounded font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2 text-white cursor-pointer" onClick={() => setChooseSeats(false)}>Guardar selección</button>
                            </div>
                        </div>
                    </div>
                }
                <div className="flex flex-col md:flex-row bg-[#1a1a1a] gap-5 mt-10">
                    <div className="flex justify-center items-center h-full w-full md:w-1/3 lg:w-1/4">
                        <img
                            src={sesion.poster}
                            alt="Movie poster"
                            className="w-full h-auto max-w-xs md:max-w-none"
                        />
                    </div>
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <h1 className="text-4xl font-bold mb-4 text-white">{sesion.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-white">
                            <span className="px-2 py-1 bg-red-600 rounded">{sesion.rated}</span>
                            <span className="flex items-center gap-2">
                                {sesion.runtime}
                            </span>
                        </div>

                        <p className="text-gray-300 mb-6">{sesion.plot}</p>

                        <div className="space-y-3 text-sm text-gray-400">
                            <p><span className="text-gray-300 font-medium">Director:</span> {sesion.director}</p>
                            <p><span className="text-gray-300 font-medium">Cast:</span> {sesion.actors}</p>
                            <p><span className="text-gray-300 font-medium">Genre:</span> {sesion.genre}</p>
                            <p><span className="text-gray-300 font-medium">Released:</span> {sesion.released}</p>
                        </div>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg w-[18rem]">
                        <h2 className="text-2xl font-bold mb-6">Reservar Tickets</h2>

                        <div className="mb-3">
                            <label className="block text-sm font-medium mb-2">Selecciona fecha</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    key={sesion.date}
                                    onClick={() => setSelectedDate(sesion.date)}
                                    className={`p-2 rounded text-sm transition cursor-pointer ${selectedDate === sesion.date
                                        ? 'bg-red-600'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                >
                                    {formattedDate}
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Selecciona horario</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    key={sesion.showtime}
                                    onClick={() => setSelectedTime(sesion.showtime)}
                                    className={`p-2 rounded text-sm transition cursor-pointer ${selectedTime === sesion.showtime
                                        ? 'bg-red-600'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                >
                                    {sesion.showtime}
                                </button>
                            </div>
                        </div>
                        <button className={`w-full py-2 rounded font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${clickedSeats.length > 0 ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'}`} onClick={() => setChooseSeats(true)}>Elegir asientos</button>

                        <div className="border-t border-gray-800 pt-6 mb-6">
                            {clickedSeats ? (
                                <div className="flex justify-between mb-2">
                                    <span>Tickets ({clickedSeats.length} × <span className="font-bold">6€</span>)</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                            ) : (null)}
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${calculateTotal()}</span>
                            </div>
                        </div>

                        <button
                            className={`w-full py-3 rounded font-semibold transition flex items-center justify-center gap-2 ${clickedSeats.length > 0 && selectedDate !== '' && selectedTime !== '' > 0 ? ("bg-red-600 hover:bg-red-700 cursor-pointer") : ("bg-gray-400 hover:bg-gray-500 cursor-not-allowed")}`}
                            onClick={() => {
                                if (clickedSeats.length > 0 && selectedDate !== '' && selectedTime !== '') {
                                    comprarEntrada(sesion.imdbID);
                                }
                            }
                            }
                        >
                            Reservar
                        </button>

                        <p className="text-xs text-gray-400 text-center mt-4">
                            Si reservas, aceptas nuestros términos y condiciones
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
}
