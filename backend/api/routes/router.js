import { fetchRecipeDetails } from './api.js';

export function setupRouting() {
    window.addEventListener('popstate', loadContent);
    loadContent(); // Initial load
}

export function loadContent() {
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

export function navigateBack() {
    history.pushState({}, null, '/');
    loadContent();
}
