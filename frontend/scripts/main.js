document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.button').addEventListener('click', async () => {
        const ingredients = document.getElementById('ingredientInput').value.split(',').map(i => i.trim()).join(',');
        if (!ingredients){
            return alert('Please enter at least one ingredient.')
        }else {
            // Navigate to the recipe list view, and enter ingredients to fetch recipes into url
            // Update the URL without the hashtag
            const newUrl = `${window.location.origin}/?query=${ingredients}`;
            history.pushState(null, '', newUrl);
            location.reload();
        }
    });
});

