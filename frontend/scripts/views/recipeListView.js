export function renderRecipeList(recipes, onRecipeClick) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';

    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found. Try different ingredients!</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" />
            <div class="recipe-content">
                <h3>${recipe.title}</h3>
                <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
                <p>Missing Ingredients: ${recipe.missedIngredientCount}</p>
                <a href="#" data-id="${recipe.id}">Show Recipe</a>
            </div>
        `;
        recipeElement.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            onRecipeClick(recipe.id);
        });
        recipesContainer.appendChild(recipeElement);
    });
}
