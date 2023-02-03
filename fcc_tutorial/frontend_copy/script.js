const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7469ed3680443d6e257fdafd58640f36&page=1';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=7469ed3680443d6e257fdafd58640f36&query=";
const SEARCH_PATH = "https://google.com/search?q=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);
function returnMovies(url) {
    fetch(url).then(res => res.json())
    .then(function(data) {
        console.log(data.results);
        data.results.forEach(element => {
            // uses .createElement, .setAttribute, and .appendChild to add to html
            // creates new elements then sets attributes for each
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            const center = document.createElement('div');
            center.setAttribute('class', 'center');

            const link = document.createElement('a');
            link.setAttribute('class', 'link')
            
            // sets more attributes using .innerHTML and .{attribute}
            movie_title = `${element.title}`;
            title.innerHTML = movie_title + `<br><a class="review_link" 
            href="movie.html?id=${element.id}&title=${movie_title}">Reviews</a>`;
            link.href = SEARCH_PATH + movie_title.split(" ").join("+");
            link.target = "_blank";
            image.src = IMG_PATH + element.poster_path;

            // appends elements to each other
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            link.appendChild(div_card);
            div_column.appendChild(link);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
        
            // above js code creates and adds below html code to index.html
            // ------------------------------------------------
            // <div class="row">
            //    <div class="column">
            //       <a href="https://google.com/search?q=${movie_title}"
            //        <div class="card">
            //            <div class="center">
            //              <img src="image.jpg" class="thumbnail">
            //            </div>
            //            <h3 class="title">Movie Title<br><a class="review_link" 
            //              href="movie.html?id=${element.id}&title=${movie_title}">
            //              Reviews</a>`;
            //            </h3>
            //     </div>
            //   </div>
            // </div>
            // ------------------------------------------------
        });
    });
}

// listens to query and displays relevant movies
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }

});