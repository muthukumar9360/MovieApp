const apiKey = '39128950'; 
const input = document.getElementById('movieInput');
const suggestionsDiv = document.getElementById('suggestions');
const movieDetailsDiv = document.getElementById('movie-details');

input.addEventListener('input', async () => {
  const name = input.value.trim();
  if (name.length < 2) {
    suggestionsDiv.innerHTML = '';
    return;
  }

  const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(name)}&apikey=${apiKey}`);
  const data = await res.json();

  suggestionsDiv.innerHTML = '';
  if (data.Response === 'True') {
    data.Search.forEach(movie => {
      const div = document.createElement('div');
      div.textContent = `${movie.Title} (${movie.Year})`;

      const btn = document.createElement('button');
      btn.textContent = 'Get Details';
      btn.style.marginLeft = '10px';
      btn.onclick = () => showDetails(movie.imdbID);

      div.appendChild(btn);
      suggestionsDiv.appendChild(div);
    });
  } else {
    suggestionsDiv.innerHTML = '<p>No results found</p>';
  }
});


async function showDetails(id) {
  movieDetailsDiv.innerHTML = ''; 

  const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`);
  const movie = await res.json();

  if (movie.Response === 'True') {
    movieDetailsDiv.innerHTML = `
      <h3>${movie.Title} (${movie.Year})</h3>
      <p>Genre: ${movie.Genre}</p>
      <p>Director: ${movie.Director}</p>
      <p>Actors: ${movie.Actors}</p>
      <p>Plot: ${movie.Plot}</p>
      <p>IMDB Rating: ${movie.imdbRating}</p>
      ${movie.Poster !== 'N/A' ? `<img src="${movie.Poster}" width="150">` : ''}
    `;
  } else {
    movieDetailsDiv.innerHTML = '<p>Details not available.</p>';
  }
}
