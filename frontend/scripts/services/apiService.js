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

export async function saveRecipe(recipeDetails, recipeResults) {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const recipeData = {
        details: recipeDetails,
        results: recipeResults
    };

    const response = await fetch(`http://127.0.0.1:5000/save_recipes`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
},
        body: JSON.stringify(recipeData)
    })

    return response.json();
}

export async function getRecipesForUser() {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const response = await fetch(`http://127.0.0.1:5000/get_recipes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    });

    return response.json();
}

export async function getResultsForUser() {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const response = await fetch(`http://127.0.0.1:5000/get_results`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    });
    

    return response.json();
}

export async function textToSpeech(text) {
    try {
        const response = await fetch(`${BASE_URL}/textToSpeech`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.audioUrl;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}