import { API_KEY, BASE_URL } from '../../../config/config.js';

export async function fetchRecipesByIngredients(ingredients) {
    const url = `${BASE_URL}/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
    return response.json();
}

export async function fetchRecipeDetails(recipeId) {
    const url = `${BASE_URL}/recipes/${recipeId}/information?includeNutrition=true&apiKey=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch recipe details. Status: ${response.status}`);
    return response.json();
}
