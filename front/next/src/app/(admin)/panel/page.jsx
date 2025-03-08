'use client'
import { sessionCreate, getInfoMovie, viewSessions } from "@/app/plugins/communicationManager";
import { useEffect, useState } from "react";

export default function Page() {
  const [imdb, setImdb] = useState('');
  const [movie, setMovie] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [sesions, setSesions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // console.log("Entra")
      await verSesiones();
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

  return (
    <>
      <header className="w-full h-[50px] bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="mx-5 flex justify-between h-full items-center">
          <div className="font-bold text-white text-3xl">
            Panel de admin
          </div>
        </div>
      </header>
      <div className="w-full grid md:grid-cols-2 gap-5 mt-2">
        <div className="border h-[70vh] md:ml-5">
          <form action={crearSesion}>
            <input type="text" name="imdb" placeholder="IMDB" onChange={(e) => setImdb(e.target.value)} />
            <input type="text" placeholder="Nombre de la función" readOnly defaultValue={movieName} />
            <select name="time" id="horario">
              <option value="">Seleccione un horario</option>
              <option value="16:00">16:00</option>
              <option value="18:00">18:00</option>
              <option value="20:00">20:00</option>
            </select>
            <input type="date" name="date" id="date" />
            <input type="submit" value="Crear sesión" />
          </form>
        </div>
        <div className="border h-[70vh] md:mr-5">
          {!loading ?
            (
              <ul>
                {sesions.data.length > 0 ? (
                  sesions.data.map((sesion, index) => (
                    <li key={index}>{sesion.title}</li>
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
