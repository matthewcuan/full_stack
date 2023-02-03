const url = new URL(location.href);
const movieId = url.searchParams.get("id"); 
const movieTitle = url.searchParams.get("title")

const APILINK = 'http://localhost:8000/api/v1/reviews/';

const main = document.getElementById("review_section");
const title = document.getElementById("title");

title.innerText = movieTitle;

// card for adding a new review
const new_card = document.createElement('div');
new_card.innerHTML = `
<div class="row">
    <div class="column">
         <div class="card review_card" id="new_card">
            <p><strong>New Review: </strong>
                <input class="edit_input" type="text" id="new_review">
            </p>
            <p><strong>User: </strong>
                <input class="edit_input" type="text" id="new_user">
            </p>
            <p>
                <a href="#" onclick="saveReview('new_review', 'new_user')">&#128190;</a>
            </p>
         </div>         
     </div>
</div>
`

main.appendChild(new_card);

returnReviews(APILINK);

// displays reviews (read)
function returnReviews(url) {
    fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data) {
        console.log(data);
        data.forEach(review => {
            const div_card = document.createElement('div');
            div_card.innerHTML = `
            <div class="row">
                <div class="column">
                    <div class="card review_card" id="${review._id}">
                        <p class="review_content"><strong>Review: </strong>${review.review}</p>
                        <p class="review_content"><strong>User: </strong>${review.user}</p>
                        <p class="review_content"><a href="#" onclick="editReview('${review._id}', '${review.review}', 
                        '${review.user}')">&#9999;&#65039;</a> <a href="#" onclick="deleteReview('${review._id}')">&#128465;</a></p>                   
                    </div>
                </div>
            </div>
            `

            main.appendChild(div_card);
        });
    });
}

// enters editing mode (update)
function editReview(id, review, user) {
    console.log("editing");
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
    <p><strong>Review: </strong>
        <input class="edit_input" type="text" id="${reviewInputId}" value="${review}">
    </p>
    <p><strong>User: </strong>
        <input class="edit_input" type="text" id="${userInputId}" value="${user}">
    </p>
    <p>
    <a href="#" onclick="cancelEdit('${id}', '${review}', '${user}')">&#11013;&#65039;</a>
    <a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', 
    '${id}')">&#128190;</a>
    </p>
    `
}

// returns to uneditable version of review card
function cancelEdit(id, review, user) {
    console.log("cancelled");
    const element = document.getElementById(id);

    element.innerHTML = `
    <p class="review_content"><strong>Review: </strong>${review}</p>
    <p class="review_content"><strong>User: </strong>${user}</p>
    <p class="review_content"><a href="#" onclick="editReview('${id}', '${review}', 
    '${user}')">&#9999;&#65039;</a> <a href="#" onclick="deleteReview('${id}')">&#128465;</a></p>
    `
}

// saves review to database (create/update)
function saveReview(reviewInputId, userInputId, id) {
    console.log("saving");
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if (id) {
        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            location.reload();
        }); 
    } else {
        fetch(APILINK + "/new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"movieId": movieId, "user": user, "review": review})
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            location.reload();
        }); 
    }
    
}

// deletes review (delete)
function deleteReview(id) {
    fetch(APILINK + id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });    
}