import { displayRecipes, displayRecipeDetails, showLoading } from './ui.js';

const API_KEY = '4c161bfe1a274a4b8f44d41892261ee7'; // Replace with your actual API key

export function fetchRecipes() {
    const ingredientInput = document.getElementById('ingredientInput').value;
    if (!ingredientInput) {
        alert("Please enter some ingredients.");
        return;
    }

    const ingredients = ingredientInput.split(',').map(item => item.trim()).join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`;

    showLoading(true);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayRecipes(data))
        .catch(error => {
            console.error('Error fetching recipes:', error);
            alert("Failed to fetch recipes. Please try again later.");
        })
        .finally(() => showLoading(false));
}

export function fetchRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${API_KEY}`;

    showLoading(true);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch recipe details. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayRecipeDetails(data))
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            alert("Failed to load recipe details. Please try again later.");
        })
        .finally(() => showLoading(false));
}
