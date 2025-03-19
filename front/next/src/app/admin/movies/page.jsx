'use client'
import { sessionCreate, getInfoMovie, viewSessions, getInfoSessions } from "@/app/plugins/communicationManager";
import { useEffect, useState } from "react";

export default function Page() {
  const [imdb, setImdb] = useState('');
  const [movie, setMovie] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [sesions, setSesions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [range, setRange] = useState('all');

  useEffect(() => {
    (async () => {
      // console.log("Entra")
      await verSesiones();
      await verTicketsComprados();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setMovieName(movie.Title || '');
  }, [movie]);

  useEffect(() => {
    (async () => {
      if (imdb !== '') {
        console.log("IMDB: ", imdb);
        const response = await getInfoMovie(imdb);
        console.log(response);
        if (response.Response === 'True') {
          setMovie(response);
        } else {
          console.log("No existe ninguna pelicula con ese IMDB");
        }
      }
    })();
  }, [imdb])

  async function verTicketsComprados() {
    try {
      const response = await getInfoSessions();
      console.log(response);
      setTickets(response);
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  async function crearSesion(formData) {
    const imdbID = formData.get("imdb");
    const time = formData.get("time");
    const date = formData.get("date");
    const sesionData = {
      "imdb": imdbID,
      "title": movieName,
      "time": time,
      "date": date,
    }
    console.log("sesionData: ", sesionData);
    try {
      const response = await sessionCreate(sesionData);
      console.log(response);
      setMovieName('');
      verSesiones();
    } catch (error) {
      console.error("Error try-catch: ", error);
    }
  }

  async function verSesiones() {
    try {
      const response = await viewSessions();
      console.log("Response: ", response);
      setSesions(response);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  function totalTickets() {
    let total = 0;
    tickets.data.map((ticket) => {
      total += ticket.total;
    })
    return total;
  }

  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full flex justify-center items-center">
          <select name="daySelector" id="daySelector" className="p-2 border border-gray-300 rounded-md">
            <option value="today">Hoy</option>
            <option value="2023-03-17">17 mar</option>
            <option value="2023-03-16">domingo, 16 mar</option>
            <option value="2023-03-15">sabado, 15 mar</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-10 mt-5">
          {/* Today's Sales Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ventas de hoy</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{!loading && totalTickets()} €</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <svg height="1.3em" width="1.3em" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M19 7.11111C17.775 5.21864 15.8556 4 13.6979 4C9.99875 4 7 7.58172 7 12C7 16.4183 9.99875 20 13.6979 20C15.8556 20 17.775 18.7814 19 16.8889M5 10H14M5 14H14" stroke="#000000"></path> </g></svg>
              </div>
            </div>
          </div>

          {/* Active Sessions Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Sesiones activas</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg height="1.3em" width="1.3em" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"><path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z"></path></g></svg>
              </div>
            </div>
          </div>

          {/* Tickets Sold Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tickets Sold Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{!loading && tickets.data.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg height="1.3em" width="1.3em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z" stroke="#292D32"></path> <path d="M10 4L10 20" stroke="#292D32"></path> </g></svg>              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Online Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">42</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg height="1.3em" width="1.3em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M9 0C5.96243 0 3.5 2.46243 3.5 5.5C3.5 8.53757 5.96243 11 9 11C12.0376 11 14.5 8.53757 14.5 5.5C14.5 2.46243 12.0376 0 9 0ZM5.5 5.5C5.5 3.567 7.067 2 9 2C10.933 2 12.5 3.567 12.5 5.5C12.5 7.433 10.933 9 9 9C7.067 9 5.5 7.433 5.5 5.5Z" fill="#000000"></path> <path d="M15.5 0C14.9477 0 14.5 0.447715 14.5 1C14.5 1.55228 14.9477 2 15.5 2C17.433 2 19 3.567 19 5.5C19 7.433 17.433 9 15.5 9C14.9477 9 14.5 9.44771 14.5 10C14.5 10.5523 14.9477 11 15.5 11C18.5376 11 21 8.53757 21 5.5C21 2.46243 18.5376 0 15.5 0Z" fill="#000000"></path> <path d="M19.0837 14.0157C19.3048 13.5096 19.8943 13.2786 20.4004 13.4997C22.5174 14.4246 24 16.538 24 19V21C24 21.5523 23.5523 22 23 22C22.4477 22 22 21.5523 22 21V19C22 17.3613 21.0145 15.9505 19.5996 15.3324C19.0935 15.1113 18.8625 14.5217 19.0837 14.0157Z" fill="#000000"></path> <path d="M6 13C2.68629 13 0 15.6863 0 19V21C0 21.5523 0.447715 22 1 22C1.55228 22 2 21.5523 2 21V19C2 16.7909 3.79086 15 6 15H12C14.2091 15 16 16.7909 16 19V21C16 21.5523 16.4477 22 17 22C17.5523 22 18 21.5523 18 21V19C18 15.6863 15.3137 13 12 13H6Z" fill="#000000"></path> </g> <defs> <clipPath id="clip0_1251_98416"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5 mx-10">
          <table className="min-w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="py-3 px-2">#</th>
                <th className="py-3 px-2">Client</th>
                <th className="py-3 px-2">Pel·licula</th>
                <th className="py-3 px-2">Horari</th>
                <th className="py-3 px-2">Data</th>
                <th className="py-3 px-2">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">

              {!loading && tickets.data.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-200">
                  <td className="py-3 px-2">{ticket.id}</td>
                  <td className="py-3 px-2">{ticket.cliente.name}</td>
                  <td className="py-3 px-2">{ticket.sessions.title}</td>
                  <td className="py-3 px-2">{ticket.sessions.time}</td>
                  <td className="py-3 px-2">{ticket.sessions.date}</td>
                  <td className="py-3 px-2">{ticket.total} €</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-5 my-5">
        <div className="bg-white rounded-lg shadow-md p-3 h-[70vh] md:ml-5">
          <form action={crearSesion} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              IMDB
            </label>
            <input type="text" name="imdb" className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required onChange={(e) => setImdb(e.target.value)} />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título de la película
            </label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required readOnly defaultValue={movieName} />
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Seleccione un horario
            </label>
            <select name="time" id="horario" className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required >
              <option value=""></option>
              <option value="16:00">16:00</option>
              <option value="18:00">18:00</option>
              <option value="20:00">20:00</option>
            </select>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de la función
            </label>
            <input type="date" name="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" required id="date" />
            <input type="submit" value="Crear sesión" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors" />
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-md p-3 h-[70vh] md:mr-5 overflow-y-scroll">
          {!loading ?
            (
              <ul>
                {sesions.data.length > 0 ? (
                  sesions.data.map((sesion, index) => (
                    <div
                      key={sesion.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-lg mb-2">{sesion.title}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <span>{sesion.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>{sesion.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>No se encuentran resultados</h1>
                )}
              </ul>
            ) : (
              <h1>Cargando resultados</h1>
            )
          }
        </div>
      </div>
    </>
  );
}
