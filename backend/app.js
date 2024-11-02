// Your Spoonacular API key
const API_KEY = '';
function fetchRecipes() {
    const ingredientInput = document.getElementById('ingredientInput').value;
    if (!ingredientInput) {
        alert("Please enter some ingredients.");
        return;
    }

    const ingredients = ingredientInput.split(',').map(item => item.trim()).join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayRecipes(data))
        .catch(error => console.error('Error:', error));
}

// Function to display recipes
function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = ""; // Clear previous results

    if (recipes.length === 0) {
        recipesContainer.innerHTML = "<p>No recipes found. Try different ingredients!</p>";
        return;
    }

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}" style="width:100px; height:auto;"/>
            <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
            <p>Missing Ingredients: ${recipe.missedIngredientCount}</p>
            <a href="#" onclick="handleRecipeClick(${recipe.id}); return false;">Show Recipe</a>
        `;
        recipesContainer.appendChild(recipeElement);
    });
}

function handleRecipeClick(recipeId) {
    console.log('Recipe ID clicked:', recipeId); // Log clicked recipe ID
    fetchRecipeDetails(recipeId);
}

function fetchRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Recipe Data:', data); // Log the fetched recipe data
            displayRecipeDetails(data);
        })
        .catch(error => console.error('Error fetching recipe details:', error));
}

function displayRecipeDetails(recipe) {
    if (!recipe) {
        console.error('No recipe data found.'); // Log if recipe is undefined
        return;
    }

    const container = document.getElementById('recipe-container');
    container.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p>${recipe.summary}</p>
        <h3>Ingredients</h3>
        <ul>
            ${recipe.extendedIngredients ? recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('') : '<li>No ingredients found.</li>'}
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.instructions || 'No instructions available.'}</p>
    `;

    // Show recipe details and hide recipe list
    container.style.display = 'block';
    document.getElementById('recipesContainer').style.display = 'none'; // Hide the recipes list
    document.getElementById('backButton').style.display = 'block'; // Show the back button
}

function goBack() {
    document.getElementById('recipe-container').style.display = 'none'; // Hide the recipe details
    document.getElementById('recipesContainer').style.display = 'block'; // Show the recipes list
    document.getElementById('backButton').style.display = 'none'; // Hide the back button
}