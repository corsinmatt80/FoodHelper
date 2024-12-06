import { textToSpeech } from '../services/apiService.js';

export function renderRecipeDetails(recipe, onBackClick) {


    const container = document.getElementById('recipe-container');
    // Get steps from analyzedInstructions
    const steps = recipe.analyzedInstructions?.[0]?.steps || [];
    let currentInstructionIndex = 0;
    container.innerHTML = `
        <div class="recipe-header">
            <h2>${recipe.title}</h2>
            <button id="backButton">Back to Recipes</button>
        </div>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <div class="overview">
            <div><small>Cooking Time</small><span>${recipe.readyInMinutes || 'N/A'} min</span></div>
            <div><small>Calories</small><span>${recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 'N/A'} kcal</span></div>
            <div><small>Protein</small><span>${recipe.nutrition?.nutrients?.find(n => n.name === "Protein")?.amount || 'N/A'} g</span></div>
            <div><small>Fat</small><span>${recipe.nutrition?.nutrients?.find(n => n.name === "Fat")?.amount || 'N/A'} g</span></div>

        </div>
        <p class="recipe-summary">${recipe.summary || 'No summary available.'}</p>
        <h3>Ingredients</h3>
        <ul class="ingredients-list">
            ${recipe.extendedIngredients ? recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('') : '<li>No ingredients found.</li>'}
        </ul>
        <h3>Instructions</h3>
        <ol class="instructions-list">
            ${steps.length > 0
            ? steps.map(step => `<li>${step.step}</li>`).join('')
            : '<li>No instructions available.</li>'
        }
        </ol>
        <ol class="instructions-player">
        ${recipe.instructions ? `
                <button id="openModalButton" class="instructions-button">Play Instructions</button>
                <div id="instructionsModal" class="modal">
                    <div class="modal-content">
                        <span class="close" id="closeModalButton">&times;</span>
                        <div id="instructionsContainer">
                            <p id="currentInstruction">${steps[currentInstructionIndex].step}</p>
                            <button id="prevInstructionButton" class="instructions-button">Previous</button>
                            <button id="nextInstructionButton" class="instructions-button">Next</button>
                            <button id="playInstructionButton" class="instructions-button">Play</button>
                        </div>
                    </div>
                </div>
            ` : '<li>No instructions available.</li>'}
    </ol>
    `;

    // Show the container and hide main content
    container.style.display = 'block';
    document.getElementById('main-content').style.display = 'none';

    // Attach event handlers
    document.getElementById('backButton').onclick = onBackClick;
    document.getElementById('openModalButton').onclick = openInstructionsModal;
    document.getElementById('closeModalButton').onclick = closeInstructionsModal;
    document.getElementById('prevInstructionButton').onclick = showPreviousInstruction;
    document.getElementById('nextInstructionButton').onclick = showNextInstruction;
    document.getElementById('playInstructionButton').onclick = playCurrentInstruction;

    function openInstructionsModal() {
        document.getElementById('instructionsModal').style.display = 'block';
        updateInstruction();
    }

    function closeInstructionsModal() {
        document.getElementById('instructionsModal').style.display = 'none';
    }

    function updateInstruction() {
        document.getElementById('currentInstruction').innerText = steps[currentInstructionIndex].step;
    }

    function showPreviousInstruction() {
        if (currentInstructionIndex > 0) {
            currentInstructionIndex--;
            updateInstruction();
        }
    }

    function showNextInstruction() {
        if (currentInstructionIndex < steps.length - 1) {
            currentInstructionIndex++;
            updateInstruction();
        }
    }

    async function playCurrentInstruction() {
        try {
            const text = steps[currentInstructionIndex].step;
            const audioUrl = await textToSpeech(text);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error('Error playing instruction:', error);
        }
    }

}


