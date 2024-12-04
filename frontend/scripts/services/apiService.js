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

export async function registerUser(username, password) {
    const response = await fetch(`http://127.0.0.1:5000/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response.json();  // Assuming the backend sends back some JSON data
}

export async function loginUser(username, password) {
    const response = await fetch(`http://127.0.0.1:5000/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('user', JSON.stringify(data));
    }
    return response;
}

export async function saveRecipe(recipeDetails) {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    console.log(userData.token)
    const response = await fetch(`http://127.0.0.1:5000/save_recipes`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
},
        body: JSON.stringify(recipeDetails)
    });

    return response.json();
}
