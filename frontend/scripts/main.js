import { fetchRecipesByIngredients, fetchRecipeDetails } from './services/apiService.js';
import { renderRecipeList } from './views/recipeListView.js';
import { renderRecipeDetails } from './views/recipeDetailView.js';
import { showLoading } from './utils/domUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.button').addEventListener('click', async () => {
        const ingredients = document.getElementById('ingredientInput').value.split(',').map(i => i.trim()).join(',');
        showLoading(true);
        try {
            const recipes = await fetchRecipesByIngredients(ingredients);
            renderRecipeList(recipes, showRecipeDetails);
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
