// Search the recipe included in Part 1 without leaving the page.
const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('#recipe-search');
const recipeCard = document.querySelector('.recipe-card');
const noResults = document.querySelector('#no-results');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLowerCase();
  const matches = 'apple crisp dessert fall vanilla ice cream'.includes(query);
  recipeCard.hidden = !matches;
  noResults.hidden = matches;
});
noResults.setAttribute('role', 'status');
