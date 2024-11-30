import { fetchRecipesByIngredients, fetchRecipeDetails } from './services/apiService.js';
import { renderRecipeList } from './views/recipeListView.js';
import { renderRecipeDetails } from './views/recipeDetailView.js';
import { showLoading } from './utils/domUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.button').addEventListener('click', async () => {
        const ingredients = document.getElementById('ingredientInput').value.split(',').map(i => i.trim()).join(',');
        const diet = document.getElementById('dietSelect').value || null;
        const intolerances = document.getElementById('intoleranceSelect').value.split(',').map(i => i.trim()).join(',') || null;
        const maxCalories = document.getElementById('caloriesSelect').value || null;
        const cuisine = document.getElementById('cuisineSelect').value || null;

        showLoading(true);
        try {
            const recipes = await fetchRecipesByIngredients(ingredients, diet, intolerances, maxCalories, cuisine);
            console.log(recipes.number);
            const recipeDetails = [];
            for(let i = 0;i<recipes.number;i++){
                let recipeDetail = await fetchRecipeDetails(recipes.results[i].id);
                recipeDetails.push(recipeDetail);
            }
            renderRecipeList(recipes, recipeDetails, showRecipeDetails);
        } catch (error) {
            console.error(error);
            alert('Failed to load recipes.');
        } finally {
            showLoading(false);
        }
    });
});

async function showRecipeDetails(recipeId) {
    showLoading(true);
    try {
        const recipe = await fetchRecipeDetails(recipeId);
        renderRecipeDetails(recipe, navigateBack);
    } catch (error) {
        console.error(error);
        alert('Failed to load recipe details.');
    } finally {
        showLoading(false);
    }
}

function navigateBack() {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('recipe-container').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const filtersButton = document.querySelector('.filters-button');
    const filtersContainer = document.querySelector('.filters-container');

    filtersButton.addEventListener('click', function() {
        filtersContainer.classList.toggle('active');
    });
});
