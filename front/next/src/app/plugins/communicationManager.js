const Host = "http://localhost:8000/api";
const omdbAPI = "http://www.omdbapi.com/?apikey=ea676a76";

// Crear sesión de película
export async function sessionCreate(sesionData) {
    try {
        const movie = await fetch(`${omdbAPI}&i=${sesionData.imdb}`);
        const dataMovie = movie.json();
        if (dataMovie && dataMovie.Response === 'False') {
            console.error('Error: No existe ninguna pelicula con ese IMDB');
            return null;
        }

        try {
            const response = await fetch(`${Host}/session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Importante para que el servidor lo interprete como JSON
                },
                body: JSON.stringify({
                    "imdb": sesionData.imdb,
                    "title": sesionData.title,
                    "time": sesionData.time,
                    "date": sesionData.date
                })
            });
            const data = response.json();
            return data;
        } catch (error) {
            console.error("Error try-catch 2: ", error)
        }
        // return sesionData;
    } catch (error) {
        console.error("Error try-catch: ", error);
    }
}

export async function getInfoMovie(imdb) {
    try {
        const movie = await fetch(`${omdbAPI}&i=${imdb}`);
        const dataMovie = movie.json();
        if (dataMovie && dataMovie.Response === 'False') {
            console.error('Error: No existe ninguna pelicula con ese IMDB');
            return null;
        }
        return dataMovie;
    } catch (error) {
        console.error("Error try-catch: ", error);
    }
}

export async function searchMovie(title) {
    console.log(title)
    const response = await fetch(`${omdbAPI}&s=${title}`);
    const data = response.json();
    return data;
}