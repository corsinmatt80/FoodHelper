export function renderRecipeList(recipe, recipeDetails,onRecipeClick) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';
    const recipes = recipe.results;


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
            <img src="${recipes[i].image}" alt="${recipes[i].title}" />
            <div class="recipe-content">
                <h3>${recipes[i].title}</h3>
                <p>Diets: ${diets}</p>
                <p>Calories: ${calories}</p>
                <a href="#" data-id="${recipes[i].id}">Show Recipe</a>
            </div>
        `;
        recipeElement.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            onRecipeClick(recipes[i].id);
        });
        recipesContainer.appendChild(recipeElement);
    }
}

function getDietsString(recipeDetail) {
    if (!recipeDetail.diets || recipeDetail.diets.length === 0) {
        return "No diets specified";
    }
    return recipeDetail.diets.join(" & ");
}

function getCaloriesInfo(recipeDetail) {
    if (!recipeDetail.nutrition || !recipeDetail.nutrition.nutrients) {
        return "Nutrition information is unavailable";
    }

    const calories = recipeDetail.nutrition.nutrients.find(nutrient => nutrient.name === "Calories");
    if (!calories) {
        return "Calories information is unavailable";
    }
    return `${calories.amount} ${calories.unit}`;
}
