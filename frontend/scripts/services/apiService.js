const BASE_URL = "http://127.0.0.1:5000/api";

export async function fetchRecipesByIngredients(ingredients) {
    const response = await fetch(`${BASE_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
    });
    if (!response.ok) throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
    return response.json();
}

export async function fetchRecipeDetails(recipeId) {
    const response = await fetch(`${BASE_URL}/recipes/${recipeId}`);
    if (!response.ok) throw new Error(`Failed to fetch recipe details. Status: ${response.status}`);
    return response.json();
}
