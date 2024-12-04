const BASE_URL = "http://127.0.0.1:5000/api"; // Assuming your Flask server is running locally on port 5000

export async function fetchRecipesByIngredients(ingredients = null, diet = null, intolerances = null, maxCalories = null, cuisine = null) {
    const body = {
        ingredients,
        diet,
        intolerances,
        maxCalories,
        cuisine
    };

    // Remove null or undefined values from the body
    const filteredBody = Object.fromEntries(Object.entries(body).filter(([_, v]) => v != null));

    const response = await fetch(`${BASE_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filteredBody),
    });

    if (!response.ok) throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
    return response.json();
}

export async function fetchRecipeDetails(recipeId) {
    const response = await fetch(`${BASE_URL}/recipes/${recipeId}`);
    if (!response.ok) throw new Error(`Failed to fetch recipe details. Status: ${response.status}`);
    return response.json();
}
