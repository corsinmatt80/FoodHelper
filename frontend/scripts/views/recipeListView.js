export function renderRecipeList(recipe, recipeDetails,onRecipeClick) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';
    const recipes = recipe.results;
    console.log(recipes);
    console.log(recipeDetails);

    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found. Try different ingredients!</p>';
        return;
    }

    for (let i = 0; i < recipe.number; i++) {
        let diets = getDietsString(recipeDetails[i]);
        let calories = getCaloriesInfo(recipeDetails[i])
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" />
            <div class="recipe-content">
                <h3>${recipe.title}</h3>
                <p>Diets: ${diets}</p>
                <p>Calories: ${calories}</p>
                <a href="#" data-id="${recipe.id}">Show Recipe</a>
            </div>
        `;
        recipeElement.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            onRecipeClick(recipe.id);
        });
        recipesContainer.appendChild(recipeElement);
    }
}

function getDietsString(recipeDetail) {
    if (!recipe.diets || recipe.diets.length === 0) {
        return "No diets specified";
    }
    return recipe.diets.join(" & ");
}

function getCaloriesInfo(recipeDetail) {
    if (!recipe.nutrition || !recipe.nutrition.nutrients) {
        return "Nutrition information is unavailable";
    }

    const calories = recipe.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");
    if (!calories) {
        return "Calories information is unavailable";
    }
    return `${calories.amount} ${calories.unit}`;
}
