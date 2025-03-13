'use client'

import { useEffect, useState } from 'react';
import { viewSessions, getInfoMovie } from "@/app/plugins/communicationManager";
import MovieComp from '../../../components/MovieComp';
import AuthComp from '@/components/AuthComp';
import SearchComp from '@/components/SearchComp';
import { useRouter } from 'next/navigation'

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sesions, setSesions] = useState([]);
  const [loginAuth, setLoginAuth] = useState(false);
  const router = useRouter();

  async function buscarMovie() {
    router.push(`/search?title=${searchTerm}`)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') buscarMovie();
  }

  useEffect(() => {
    (async () => {
      await cargarInfoSesiones();
    })();
  }, [sesions])

  useEffect(() => {
    (async () => {
      await verSesiones();
      setLoading(false);
    })();
  }, []);

  async function cargarInfoSesiones() {
    if (sesions.data) {
      for (let i = 0; i < sesions.data.length; i++) {
        const newValue = await getInfoMovie(sesions.data[i].imdb);
        setMovies(prevValue => [...prevValue, newValue]);
      }
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
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {!loading ?
              (
                movies.length > 0 ? (
                  movies.map((movie, index) => (
                    <MovieComp key={index} movie={movie} />
                  ))
                ) : (
                  <h1>No se encuentran resultados</h1>
                )
              ) : (
                <h1>Cargando resultados</h1>
              )
            }
          </div>
        </main>
      </div>

    </>
  );
}
