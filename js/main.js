$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
})

function getMovies(searchText){
    axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=7a634b32')
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
                <div class="col-md-3 mb-4">
                    <div class="card text-center">
                        <img src="${movie.Poster}">
                        <h5 class="text-white">${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary text-white">Movie Details</a>
                    </div>
                </div>
            `;
        });
        $('#movies').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}


function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    console.log('changed');
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=7a634b32')
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong class="text-white">Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong class="text-white">Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong class="text-white">Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong class="text-white">IMDB Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong class="text-white">Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong class="text-white">Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong class="text-white">Actors:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="seperator"></div>
            <div class="row">
                <div class="card m-5">
                    <h3 class="text-white">Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary button">View IMDB</a>
                    <a href="index.html" class="btn btn-default text-white button">Go Back To Search</a>
                </div>
            </div>
        `;

        $('#movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}