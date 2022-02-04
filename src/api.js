export async function fetchFilms(id){
    const response = await fetch(
        `https://ghibliapi.herokuapp.com/films/${id}`
    );
    return response.json();
}