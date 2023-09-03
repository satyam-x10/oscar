// get div elements from DOM

const left = document.getElementById("left")
const bleft = document.getElementById("bleft")
const right = document.getElementById("right")
const bright = document.getElementById("bright")
const firstpage = document.getElementById("ftr")
const moviearea = document.getElementById("movie-area")
const sortbtn = document.getElementById("sortbtn")
const sortno = document.getElementById("sortno")
var movieContainer = document.getElementById('movie-area');


//  variables

let imdbRatingFilter = 0;
let pgno = 1;

// change this accordingly as how many movies u want to visibleon ur screen at once
let size = 50;


// path where our data for movies with oscar is stored in .json


var filePath = 'oscar_winners.json';
var data = {};
update();


// filter movies withimdb greater than


sortbtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting
    // to send us to first page
    pgno = 1;
    // Get the user's chosen IMDb rating
    imdbRatingFilter = parseFloat(sortno.value);
    console.log(imdbRatingFilter);
    // Clear the movie area
    moviearea.innerHTML = "";

    // Filter and display movies with IMDb ratings greater than the chosen value

    // Render the filtered movies
    renderMovies(imdbRatingFilter);
});


// Function to render movies on the page

function renderMovies(filterrate) {
    console.log("received " + filterrate);
    update(filterrate);

}


//call update  Function to update content when navigation buttons are pressed


left.addEventListener("click", () => {
    if (pgno > 1) {
        pgno--;
    }
    moviearea.innerHTML = "";


    update(imdbRatingFilter);

})
right.addEventListener("click", () => {
    if (pgno < data.length / size) {

        pgno++;
    }
    moviearea.innerHTML = "";


    update(imdbRatingFilter);

})

bleft.addEventListener("click", () => {
    pgno = 1;
    moviearea.innerHTML = "";
    update(imdbRatingFilter);

})
bright.addEventListener("click", () => {
    pgno = data.length / size;
    moviearea.innerHTML = "";
    update(imdbRatingFilter);

})



// update function to render movies. function overloading used with default setting to show movies
//  with imdb greater than 0 , which means all movies with oscar(s), when restriction Imdb rating
//  received then updates the movie accordingly


function update(filter = 0) {
    moviearea.innerHTML = ''; // Clear the existing content

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonData => {
            data = jsonData;

            // Loop through the data and create elements for each entry
            for (var i = size * (pgno - 1); i < size * pgno; i++) {
                var movieDiv = document.createElement('div');
                movieDiv.className = 'movie-card';
                var link = document.createElement('div');
                link.innerHTML = '<a href=' + data[i].movieUrl + ' target="_blank" >  </a>';

                // ... Your movie creation code ...
                // ... Your movie creation code ...
                var coverImg = document.createElement('img');
                if (data[i].niceimgurl==undefined) {
                    
                    coverImg.src = data[i].coverArt; // Use 'coverArt' from your JSON data
                }
                else{

                    coverImg.src = data[i].niceimgurl; // Use 'coverArt' from your JSON data
                }

                // Create an anchor element to wrap the image
                var movieLink = document.createElement('a');
                movieLink.href = data[i].movieUrl; // Set the href attribute to the movie's URL
                movieLink.target = '_blank'; // Open the link in a new tab

                // Append the image to the anchor element
                movieLink.appendChild(coverImg);

                var movieName = document.createElement('div');
                movieName.classList = "mtitle";
                movieName.innerText = i + 1 + ". " + data[i].title;

                var imdbRating = document.createElement('div');
                imdbRating.innerText = 'IMDB Rating: ' + data[i].imdbRating;

                var releaseYear = document.createElement('div');
                releaseYear.innerText = 'Release Year: ' + data[i].releaseYear;

                var reviewsLink = document.createElement('a');
                reviewsLink.classList = 'reviewslink';
                reviewsLink.href = `${data[i].movie_review_url}`
                reviewsLink.innerText = "Reviews";
                reviewsLink.target = "_blank"
                // reviewsLink.href = '#'; // Set the href attribute to "#" for now






                // Append elements to the container
                movieDiv.appendChild(movieLink); // Append the anchor element (with image) instead of the image alone
                movieDiv.appendChild(movieName);
                movieDiv.appendChild(imdbRating);
                movieDiv.appendChild(releaseYear);
                movieDiv.appendChild(reviewsLink);
                // movieDiv.appendChild(link);
                console.log("IMDB was " + data[i].imdbRating + " filter was " + filter);
                if (data[i].imdbRating >= filter) {

                    moviearea.appendChild(movieDiv); // Append to moviearea directly
                }
                // ... Rest of your code ...

            }
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
}


// Finish :)
