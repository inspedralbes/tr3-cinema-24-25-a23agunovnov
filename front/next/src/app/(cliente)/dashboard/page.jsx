'use client'

import { useEffect, useState } from 'react';
import { sessionCreate, searchMovie } from '../../plugins/communicationManager'
import MovieComp from '../../../components/MovieComp';
import { useRouter } from 'next/navigation'

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  async function buscarMovie() {
    router.push(`/search?title=${searchTerm}`)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') buscarMovie();
  }

  useEffect(() => {
    (async () => {
      // const response = await sessionCreate("tt3896198");
    })();
  }, [])
  console.log("PELI: ", movies);
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 h-[40vh] flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          </div>

          {/* Logo and Search */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center flex-col space-y-8">
              <div className="flex items-center space-x-3 text-white mb-4">
                <h1 className="text-4xl font-bold">Cinetix</h1>
              </div>

              <div className="relative w-full max-w-3xl">
                <input
                  type="text"
                  name='busqueda'
                  placeholder="Buscar películas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white/10 text-white placeholder-gray-300 px-6 py-4 pl-14 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-lg backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {!loading && movies.Response === 'True' ? (
              movies.Search.map((movie) => (
                <MovieComp key={movie.imdbID} movie={movie} />
              ))
            ) : (
              <p>{movies.Error}</p>
            )
            }
          </div>
        </main>
      </div>

    </>
  );
}
