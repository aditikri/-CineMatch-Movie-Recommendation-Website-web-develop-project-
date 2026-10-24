// CINEMATCH - MOVIE RECOMMENDATION WEBSITE

// Movie database
const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        rating: 8.8,
        emoji: "🌀",
        description: "A thief enters people's dreams to steal secrets.",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500"
    },
    {
        id: 2,
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.7,
        emoji: "🚀",
        description: "Explorers travel through space to find a new home.",
        poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500"
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genre: "Action",
        rating: 9.0,
        emoji: "🦇",
        description: "Batman faces a dangerous criminal in Gotham City.",
        poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500"
    },
    {
        id: 4,
        title: "The Pursuit of Happyness",
        year: 2006,
        genre: "Drama",
        rating: 8.0,
        emoji: "🌅",
        description: "A father struggles to build a better future for his son.",
        poster: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500"
    },
    {
        id: 5,
        title: "The Hangover",
        year: 2009,
        genre: "Comedy",
        rating: 7.7,
        emoji: "😂",
        description: "Friends wake up after a wild night with missing memories.",
        poster: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500"
    },
    {
        id: 6,
        title: "The Conjuring",
        year: 2013,
        genre: "Thriller",
        rating: 7.5,
        emoji: "👻",
        description: "Paranormal investigators investigate a haunted house.",
        poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500"
    },
    {
        id: 7,
        title: "Finding Nemo",
        year: 2003,
        genre: "Animation",
        rating: 8.2,
        emoji: "🐠",
        description: "A clownfish crosses the ocean to find his son.",
        poster: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=500"
    },
    {
        id: 8,
        title: "Jurassic Park",
        year: 1993,
        genre: "Adventure",
        rating: 8.2,
        emoji: "🦖",
        description: "Visitors explore a theme park filled with dinosaurs.",
        poster: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500"
    },
    {
        id: 9,
        title: "Titanic",
        year: 1997,
        genre: "Romance",
        rating: 7.9,
        emoji: "🚢",
        description: "A love story unfolds aboard a legendary ocean liner.",
        poster: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500"
    },
    {
        id: 10,
        title: "Avengers: Endgame",
        year: 2019,
        genre: "Action",
        rating: 8.4,
        emoji: "⚡",
        description: "Heroes unite for one final battle to save the universe.",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500"
    },
    {
        id: 11,
        title: "The Martian",
        year: 2015,
        genre: "Adventure",
        rating: 8.0,
        emoji: "🪐",
        description: "An astronaut fights to survive alone on Mars.",
        poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500"
    },
    {
        id: 12,
        title: "The Social Network",
        year: 2010,
        genre: "Drama",
        rating: 7.8,
        emoji: "💻",
        description: "A story about the creation of a major social network.",
        poster: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500"
    }
];

// Get HTML elements
const movieGrid = document.getElementById("movieGrid");
const watchlistGrid = document.getElementById("watchlistGrid");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const resultMessage = document.getElementById("resultMessage");
const movieCount = document.getElementById("movieCount");
const watchCount = document.getElementById("watchCount");
const recommendationResult = document.getElementById("recommendationResult");
const movieDialog = document.getElementById("movieDialog");
const dialogContent = document.getElementById("dialogContent");

// Load watchlist from browser storage
let watchlist = [];

try {
    const savedWatchlist = JSON.parse(
        localStorage.getItem("cinematchWatchlist") || "[]"
    );

    if (Array.isArray(savedWatchlist)) {
        watchlist = savedWatchlist.filter(id =>
            movies.some(movie => movie.id === id)
        );
    }
} catch (error) {
    watchlist = [];
}

// Save watchlist
function saveWatchlist() {
    try {
        localStorage.setItem(
            "cinematchWatchlist",
            JSON.stringify(watchlist)
        );
    } catch (error) {
        alert("Unable to save the watchlist in this browser.");
    }
}

// Create movie card
function createMovieCard(movie) {
    const isSaved = watchlist.includes(movie.id);

    return `
        <article class="movie-card">
            <div class="movie-poster">
                <img
                    src="${movie.poster}"
                    alt="${movie.title} poster"
                    loading="lazy"
                    onerror="this.style.display='none';
                    this.nextElementSibling.style.display='flex';"
                >
                <div class="poster-fallback" style="display:none">
                    ${movie.emoji}
                </div>
                <span class="rating">⭐ ${movie.rating}</span>
            </div>

            <div class="movie-info">
                <h3>${movie.title}</h3>

                <p class="movie-meta">
                    ${movie.year} • ${movie.genre}
                </p>

                <p class="movie-description">
                    ${movie.description}
                </p>

                <div class="card-buttons">
                    <button
                        class="details-btn"
                        data-action="details"
                        data-id="${movie.id}"
                    >
                        Details
                    </button>

                    <button
                        class="watch-btn"
                        data-action="watch"
                        data-id="${movie.id}"
                    >
                        ${isSaved ? "♥ Saved" : "♡ Watchlist"}
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Display all movies
function displayMovies(movieList) {
    if (movieList.length === 0) {
        movieGrid.innerHTML = `
            <p class="empty-message">
                No movies found. Try another search.
            </p>
        `;
    } else {
        movieGrid.innerHTML = movieList
            .map(movie => createMovieCard(movie))
            .join("");
    }

    resultMessage.textContent =
        `Showing ${movieList.length} movie(s)`;
}

// Display watchlist
function displayWatchlist() {
    const savedMovies = movies.filter(movie =>
        watchlist.includes(movie.id)
    );

    if (savedMovies.length === 0) {
        watchlistGrid.innerHTML = `
            <p class="empty-message">
                Your watchlist is empty. Add movies you want to watch!
            </p>
        `;
    } else {
        watchlistGrid.innerHTML = savedMovies
            .map(movie => createMovieCard(movie))
            .join("");
    }

    watchCount.textContent = watchlist.length;
}

// Search and genre filtering
function filterMovies() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedGenre = genreFilter.value;

    const filteredMovies = movies.filter(movie => {
        const matchesTitle = movie.title
            .toLowerCase()
            .includes(searchTerm);

        const matchesGenre =
            selectedGenre === "All" ||
            movie.genre === selectedGenre;

        return matchesTitle && matchesGenre;
    });

    displayMovies(filteredMovies);
}

// Add or remove movie from watchlist
function toggleWatchlist(id) {
    if (watchlist.includes(id)) {
        watchlist = watchlist.filter(movieId => movieId !== id);
        alert("Movie removed from your watchlist.");
    } else {
        watchlist.push(id);
        alert("Movie added to your watchlist!");
    }

    saveWatchlist();
    filterMovies();
    displayWatchlist();
}

// Show movie details in a dialog
function showMovieDetails(id) {
    const movie = movies.find(item => item.id === id);

    if (!movie) return;

    dialogContent.innerHTML = `
        <h2>${movie.emoji} ${movie.title}</h2>
        <p><strong>Release Year:</strong> ${movie.year}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Rating:</strong> ⭐ ${movie.rating}/10</p>
        <p>${movie.description}</p>
        <button
            class="primary-btn"
            id="dialogWatchBtn"
        >
            ${watchlist.includes(movie.id)
                ? "Remove from Watchlist"
                : "Add to Watchlist"}
        </button>
    `;

    movieDialog.showModal();

    document.getElementById("dialogWatchBtn")
        .addEventListener("click", () => {
            toggleWatchlist(movie.id);
            movieDialog.close();
        });
}

// Recommend a random movie
function recommendMovie() {
    const movie = movies[
        Math.floor(Math.random() * movies.length)
    ];

    recommendationResult.innerHTML = `
        <h3>${movie.emoji} ${movie.title} (${movie.year})</h3>
        <p>Genre: ${movie.genre} | ⭐ ${movie.rating}/10</p>
        <p>${movie.description}</p>
        <button class="secondary-btn" id="recommendDetails">
            View Details
        </button>
    `;

    document.getElementById("recommendDetails")
        .addEventListener("click", () => {
            showMovieDetails(movie.id);
        });
}

// Search events
searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);

document.getElementById("searchBtn")
    .addEventListener("click", filterMovies);

// Handle buttons in movie cards
function handleMovieCardClick(event) {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "details") {
        showMovieDetails(id);
    } else if (action === "watch") {
        toggleWatchlist(id);
    }
}

movieGrid.addEventListener("click", handleMovieCardClick);
watchlistGrid.addEventListener("click", handleMovieCardClick);

// Random recommendation buttons
document.getElementById("randomBtn")
    .addEventListener("click", recommendMovie);

document.getElementById("recommendBtn")
    .addEventListener("click", recommendMovie);

// Clear watchlist
document.getElementById("clearWatchlistBtn")
    .addEventListener("click", () => {
        if (watchlist.length === 0) {
            alert("Your watchlist is already empty.");
            return;
        }

        if (confirm("Are you sure you want to clear your watchlist?")) {
            watchlist = [];
            saveWatchlist();
            displayWatchlist();
            filterMovies();
            alert("Watchlist cleared successfully.");
        }
    });

// Close dialog
document.getElementById("closeDialog")
    .addEventListener("click", () => {
        movieDialog.close();
    });

// Mobile navigation
document.getElementById("menuBtn")
    .addEventListener("click", () => {
        document.querySelector(".navbar")
            .classList.toggle("active");
    });

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".navbar")
            .classList.remove("active");
    });
});

// Feedback form validation and submission
document.getElementById("feedbackForm")
    .addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("userName")
            .value.trim();

        const email = document.getElementById("userEmail")
            .value.trim();

        const rating = document.getElementById("userRating")
            .value;

        const message = document.getElementById("userMessage")
            .value.trim();

        if (name.length < 2 || message.length < 5 || !rating) {
            alert("Please fill in all fields correctly.");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email address.");
            return;
        }

        alert(
            `Thank you, ${name}!\n` +
            `Your rating: ${rating}/5\n` +
            "Your feedback has been received in this demo."
        );

        event.target.reset();
    });

// Mouseover and mousemove event demonstration
const hero = document.querySelector(".hero");

hero.addEventListener("mouseover", () => {
    hero.style.transition = "background 0.3s ease";
});

hero.addEventListener("mousemove", event => {
    const position = Math.round(
        (event.clientX / window.innerWidth) * 100
    );

    hero.style.backgroundPosition = `${position}% center`;
});

// Hello button: click and double-click demonstration
const scriptingDemo = document.createElement("div");

scriptingDemo.style.cssText =
    "text-align:center;padding:20px;background:#171721;color:white;";

scriptingDemo.innerHTML = `
    <p id="scriptingMessage">
        Try the button to demonstrate JavaScript events.
    </p>
    <button
        class="primary-btn"
        id="helloButton"
        type="button"
    >
        Hello
    </button>
`;

document.querySelector(".footer").prepend(scriptingDemo);

const helloButton = document.getElementById("helloButton");
const scriptingMessage = document.getElementById("scriptingMessage");

helloButton.addEventListener("click", () => {
    scriptingMessage.textContent = "Welcome to scripting";
});

helloButton.addEventListener("dblclick", () => {
    scriptingMessage.textContent = "Thank you for using scripting";
});

// Initial page setup
movieCount.textContent = movies.length;

displayMovies(movies);
displayWatchlist();