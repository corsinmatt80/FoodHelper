// Your Spoonacular API key
const API_KEY = '4c161bfe1a274a4b8f44d41892261ee7'; // Replace with your actual API key

// Display loading indicator
function showLoading(isLoading) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
}

// Function to fetch recipes based on ingredients
function fetchRecipes() {
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
            <a href="#" onclick="showRecipeDetails(${recipe.id}); return false;">Show Recipe</a>
        `;
        recipesContainer.appendChild(recipeElement);
    });
}

// Function to handle recipe click and navigate to recipe detail view
function showRecipeDetails(recipeId) {
    history.pushState({ recipeId }, null, `/recipe/${recipeId}`);
    loadContent(); // Load the content based on the new URL
}

// Function to fetch detailed recipe information, including nutritional data
function fetchRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${API_KEY}`;

    showLoading(true); // Show loading indicator before fetch request
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

// Function to display detailed recipe information
function displayRecipeDetails(recipe) {
    if (!recipe) {
        console.error('No recipe data found.');
        return;
    }

    const container = document.getElementById('recipe-container');
    
    // Get nutritional values if available
    const calories = recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 'N/A';
    const protein = recipe.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || 'N/A';
    const fat = recipe.nutrition?.nutrients?.find(n => n.name === "Fat")?.amount || 'N/A';
    
    // Populate the container with the recipe's details in a structured layout
    container.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />

        <div class="overview">
            <div>
                <span>${recipe.readyInMinutes || 'N/A'} min</span>
                <small>Cooking Time</small>
            </div>
            <div>
                <span>${calories} kcal</span>
                <small>Calories</small>
            </div>
            <div>
                <span>${protein} g</span>
                <small>Protein</small>
            </div>
            <div>
                <span>${fat} g</span>
                <small>Fat</small>
            </div>
            <div>
                <span>${recipe.servings || 'N/A'}</span>
                <small>Servings</small>
            </div>
        </div>

        <p class="recipe-summary">${recipe.summary || 'No summary available.'}</p>

        <h3>Ingredients</h3>
        <ul class="ingredients-list">
            ${recipe.extendedIngredients ? recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('') : '<li>No ingredients found.</li>'}
        </ul>

        <h3>Instructions</h3>
        <ol class="instructions-list">
            ${recipe.instructions ? recipe.instructions.split('. ').map(step => `<li>${step}</li>`).join('') : '<li>No instructions available.</li>'}
        </ol>

        <div class="similar-recipes">
            <h3>Similar Recipes</h3>
            ${recipe.similarRecipes ? recipe.similarRecipes.map(similar => `<a href="#" onclick="fetchRecipeDetails(${similar.id}); return false;">${similar.title}</a>`).join(' | ') : '<p>No similar recipes found.</p>'}
        </div>
    `;

    container.style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('backButton').style.display = 'block';
}

// Function to handle navigation back to the recipe list view
function navigateBack() {
    history.pushState({}, null, '/');
    loadContent();
}

// Function to load content based on current URL
function loadContent() {
    const path = window.location.pathname;

    if (path.startsWith('/recipe/')) {
        const recipeId = path.split('/recipe/')[1];
        if (recipeId) {
            document.getElementById('main-content').style.display = 'none';
            document.getElementById('recipe-container').style.display = 'block';
            document.getElementById('backButton').style.display = 'block';
            fetchRecipeDetails(recipeId);
        }
    } else {
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('recipe-container').style.display = 'none';
        document.getElementById('backButton').style.display = 'none';
    }
}

// Listen for popstate event to handle browser back/forward navigation
window.addEventListener('popstate', loadContent);

// Initial load based on URL
loadContent();

// HTML structure for loading indicator
document.body.insertAdjacentHTML('beforeend', `
    <div id="loadingIndicator" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:#333; color:#fff; padding:10px; border-radius:5px;">
        Loading...
    </div>
`);
