const Host = "http://localhost:8000/api";
const omdbAPI = "http://www.omdbapi.com/?apikey=ea676a76";

// Crear sesión de película
export async function sessionCreate(imdb) {
    const response = await fetch(`${omdbAPI}&i=${imdb}`);
    const data = response.json();
    return data;
}

export async function searchMovie(title) {
    console.log(title)
    const response = await fetch(`${omdbAPI}&s=${title}`);
    const data = response.json();
    return data;
}