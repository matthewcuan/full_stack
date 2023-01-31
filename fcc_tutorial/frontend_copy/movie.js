const url = new URL(location.href);
const movieId = url.searchParams.get("id"); 
const movieTitle = url.searchParams.get("title")

const APILINK = 'http://localhost:8000/api/v1/reviews/' + movieId;

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

returnMovies(APILINK);
function returnMovies(url) {
    fetch(url).then(res => res.json())
    .then(function(data) {
        console.log(data.results);
        data.results.forEach(element => {
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

            // const release_date = document.createElement('p');
            // release_date.setAttribute('class', )
            
            movie_title = `${element.title}`;
            title.innerHTML = movie_title;
            link.href = SEARCH_PATH + movie_title.split(" ").join("+");
            link.target = "_blank";
            image.src = IMG_PATH + element.poster_path;

            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            link.appendChild(div_card);
            div_column.appendChild(link);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
        });
    });
}