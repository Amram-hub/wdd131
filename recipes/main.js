// Escape text before inserting recipe data into HTML templates.
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function tagsTemplate(tags) {
  return tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('');
}

function ratingTemplate(rating) {
  let stars = '';
  for (let index = 1; index <= 5; index++) {
    if (rating >= index) stars += '<span aria-hidden="true">★</span>';
    else if (rating >= index - 0.5) stars += '<span class="half-star" aria-hidden="true">★</span>';
    else stars += '<span aria-hidden="true">☆</span>';
  }
  return `<span class="rating" role="img" aria-label="${rating} out of 5 stars">${stars}</span>`;
}

function recipeTemplate(recipe) {
  return `<article class="recipe-card">
    <img class="recipe-image" src="${escapeHtml(recipe.image)}" alt="${escapeHtml(recipe.name)}" width="400" height="350">
    <div class="recipe-content">
      <ul class="recipe-tags" aria-label="Recipe tags">${tagsTemplate(recipe.tags)}</ul>
      <h2>${escapeHtml(recipe.name)}</h2>
      ${ratingTemplate(recipe.rating)}
      <p class="recipe-description">${escapeHtml(recipe.description)}</p>
      <p class="recipe-time">Prep: ${escapeHtml(recipe.prepTime)} · Cook: ${escapeHtml(recipe.cookTime)}</p>
    </div>
  </article>`;
}

function renderRecipes(recipeList) {
  document.querySelector('#recipe-list').innerHTML = recipeList.map(recipeTemplate).join('');
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function filterRecipes(query) {
  const keywords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return recipes.filter((recipe) => {
    const searchableText = [recipe.name, recipe.description, ...recipe.tags].join(' ').toLowerCase();
    return keywords.every((keyword) => searchableText.includes(keyword));
  }).sort((first, second) => first.name.localeCompare(second.name));
}

function searchHandler(event) {
  event.preventDefault();
  const query = document.querySelector('#search').value;
  const matches = filterRecipes(query);
  renderRecipes(matches);
  document.querySelector('#results-message').textContent = matches.length
    ? `${matches.length} recipe${matches.length === 1 ? '' : 's'} found.`
    : 'No recipes found. Try another keyword, such as chicken or dessert.';
}

function init() {
  renderRecipes([recipes[getRandomNumber(recipes.length)]]);
  document.querySelector('#results-message').textContent = 'A recipe to inspire you. Search to explore more.';
  document.querySelector('#search-form').addEventListener('submit', searchHandler);
}

init();
