export function showLoading(isLoading) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
}

export function toggleVisibility(elementId, isVisible) {
    document.getElementById(elementId).style.display = isVisible ? 'block' : 'none';
}
