export function showLoading(isLoading) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
}

export function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = ""; // Clear previous results

    if (recipes.length === 0) {
        recipesContainer.innerHTML = "<p>No recipes found. Try different ingredients!</p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" style="width:100px; height:auto;"/>
            <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
            <p>Missing Ingredients: ${recipe.missedIngredientCount}</p>
            <a href="#" onclick="showRecipeDetails(${recipe.id}); return false;">Show Recipe</a>
        `;
        recipesContainer.appendChild(recipeElement);
    });
}

export function displayRecipeDetails(recipe) {
    if (!recipe) {
        console.error('No recipe data found.');
        return;
    }

    const container = document.getElementById('recipe-container');
    
    const calories = recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 'N/A';
    const protein = recipe.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || 'N/A';
    const fat = recipe.nutrition?.nutrients?.find(n => n.name === "Fat")?.amount || 'N/A';
    
    container.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />

        <div class="overview">
            <div><span>${recipe.readyInMinutes || 'N/A'} min</span><small>Cooking Time</small></div>
            <div><span>${calories} kcal</span><small>Calories</small></div>
            <div><span>${protein} g</span><small>Protein</small></div>
            <div><span>${fat} g</span><small>Fat</small></div>
            <div><span>${recipe.servings || 'N/A'}</span><small>Servings</small></div>
        </div>

        <p class="recipe-summary">${recipe.summary || 'No summary available.'}</p>

        <h3>Ingredients</h3>
        <ul class="ingredients-list">
            ${recipe.extendedIngredients ? recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('') : '<li>No ingredients found.</li>'}
        </ul>

        <h3>Instructions</h3>
        <ol class="instructions-list">
            ${recipe.instructions ? recipe.instructions.split('. ').map(step => `<li>${step}</li>`).join('') : '<li>No instructions available.</li>'}
        </ol>
    `;

    container.style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('backButton').style.display = 'block';
}
