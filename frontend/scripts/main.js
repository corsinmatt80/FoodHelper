// Import necessary functions from various modules
import { fetchRecipesByIngredients, fetchRecipeDetails } from './services/apiService.js';
import { renderRecipeList } from './views/recipeListView.js';
import { renderRecipeDetails } from './views/recipeDetailView.js';
import { showLoading } from './utils/domUtils.js';

// Event listener for DOMContentLoaded to initialize event bindings once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listener to the button for fetching recipes
    document.querySelector('.button').addEventListener('click', async () => {
        // Collect and sanitize input values for recipe search
        const ingredients = document.getElementById('ingredientInput')
            .value
            .split(',')
            .map(i => i.trim()) // Trim whitespace from each ingredient
            .join(',');
        const diet = document.getElementById('dietSelect').value || null; // Optional diet preference
        const intolerances = document.getElementById('intoleranceSelect')
            .value
            .split(',')
            .map(i => i.trim()) // Trim whitespace from intolerances
            .join(',') || null;
        const maxCalories = document.getElementById('caloriesSelect').value || null; // Optional calorie limit
        const cuisine = document.getElementById('cuisineSelect').value || null; // Optional cuisine preference

        // Show loading indicator
        showLoading(true);

        try {
            // Fetch recipes based on provided filters and ingredients
            const recipes = await fetchRecipesByIngredients(
                ingredients, diet, intolerances, maxCalories, cuisine
            );
            // Render the fetched recipe list
            renderRecipeList(recipes.results, showRecipeDetails);
        } catch (error) {
            console.error(error);
            alert('Failed to load recipes.'); // Show error message if API call fails
        } finally {
            showLoading(false); // Hide loading indicator
        }
    });
});

// Function to display recipe details based on a selected recipe ID
async function showRecipeDetails(recipeId) {
    // Show loading indicator
    showLoading(true);

    try {
        // Fetch detailed recipe information
        const recipe = await fetchRecipeDetails(recipeId);
        // Render recipe details
        renderRecipeDetails(recipe, navigateBack);
    } catch (error) {
        console.error(error);
        alert('Failed to load recipe details.'); // Show error message if API call fails
    } finally {
        showLoading(false); // Hide loading indicator
    }
}

// Function to navigate back to the recipe list view
function navigateBack() {
    document.getElementById('main-content').style.display = 'block'; // Show main content
    document.getElementById('recipe-container').style.display = 'none'; // Hide recipe details
}

// Add an additional DOMContentLoaded listener for handling filter UI toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const filtersButton = document.querySelector('.filters-button'); // Button to toggle filters
    const filtersContainer = document.querySelector('.filters-container'); // Container holding filter options

    // Add click event listener to toggle visibility of filter options
    filtersButton.addEventListener('click', function() {
        filtersContainer.classList.toggle('active'); // Toggle the 'active' class to show/hide filters
    });
});
