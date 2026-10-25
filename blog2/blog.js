const articles = [
  {
    id: 1,
    title: "Septimus Heap Book One: Magyk",
    date: "July 5, 2022",
    description:
      "If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg",
    imgAlt: "Book cover for Septimus Heap 1",
    ages: "10-14",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐"
  },
  {
    id: 2,
    title: "Magnus Chase Book One: Sword of Summer",
    date: "December 12, 2021",
    description:
      "The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.",
    imgSrc:
      "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
    imgAlt: "Book cover for Magnus Chase 1",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐"
  },
  {
    id: 3,
    title: "Belgariad Book One: Pawn of Prophecy",
    date: "Feb 12, 2022",
    description:
      "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
    imgSrc:
      "https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg",
    imgAlt: "Book cover for Pawn of Prophecy",
    ages: "12-16",
    genre: "Fantasy",
    stars: "⭐⭐⭐⭐⭐"
  }
];

const reviewsContainer = document.querySelector("#reviews");
const ageFilter = document.querySelector("#age-filter");
const ratingFilter = document.querySelector("#rating-filter");
const genreFilter = document.querySelector("#genre-filter");
const resultCount = document.querySelector("#result-count");

// Escape text before placing it inside an HTML template.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function articleTemplate(book) {
  const starCount = Array.from(book.stars).length;

  return `
    <article class="book-review" aria-labelledby="book-${book.id}">
      <div class="book-details">
        <p class="date">${escapeHTML(book.date)}</p>
        <p>${escapeHTML(book.ages)}</p>
        <p>${escapeHTML(book.genre)}</p>
        <p>
          <span role="img" aria-label="${starCount} out of 5 stars">
            ${escapeHTML(book.stars)}
          </span>
        </p>
      </div>

      <div class="book-content">
        <h2 id="book-${book.id}">${escapeHTML(book.title)}</h2>
        <img
          src="${escapeHTML(book.imgSrc)}"
          alt="${escapeHTML(book.imgAlt)}"
          width="200"
          height="280"
          loading="lazy">
        <p>${escapeHTML(book.description)}</p>
      </div>
    </article>
  `;
}

function renderArticles(bookList) {
  reviewsContainer.innerHTML = bookList.length
    ? bookList.map(articleTemplate).join("")
    : "<p>No books match your selected filters.</p>";

  resultCount.textContent =
    `${bookList.length} book${bookList.length === 1 ? "" : "s"} found.`;
}

function filterArticles() {
  const filteredArticles = articles.filter((book) => {
    const matchesAge =
      ageFilter.value === "" || book.ages === ageFilter.value;

    const matchesRating =
      ratingFilter.value === "" ||
      Array.from(book.stars).length === Number(ratingFilter.value);

    const matchesGenre =
      genreFilter.value === "" || book.genre === genreFilter.value;

    return matchesAge && matchesRating && matchesGenre;
  });

  renderArticles(filteredArticles);
}

[ageFilter, ratingFilter, genreFilter].forEach((filter) => {
  filter.addEventListener("change", filterArticles);
});

renderArticles(articles);