export function renderRecipeDetails(recipe, onBackClick) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = `
        <div class="recipe-header">
            <h2>${recipe.title}</h2>
            <button id="backButton">Back to Recipes</button>
        </div>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <div class="overview">
            <div><small>Cooking Time</small><span>${recipe.readyInMinutes || 'N/A'} min</span></div>
            <div><small>Calories</small><span>${recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 'N/A'} kcal</span></div>
            <div><small>Protein</small><span>${recipe.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || 'N/A'} g</span></div>
            <div><small>Fat</small><span>${recipe.nutrition?.nutrients?.find(n => n.name === "Fat")?.amount || 'N/A'} g</span></div>

        </div>
        <p class="recipe-summary">${recipe.summary || 'No summary available.'}</p>
        <h3>Ingredients</h3>
        <ul class="ingredients-list">
            ${recipe.extendedIngredients ? recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('') : '<li>No ingredients found.</li>'}
        </ul>
        <h3>Instructions</h3>
        <ol class="instructions-list">
            ${recipe.instructions ? recipe.instructions.split('\n').map(step => `<li>${step.trim()}</li>`).join('') : '<li>No instructions available.</li>'}
        </ol>
    `;
    container.style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('backButton').onclick = onBackClick;

}
