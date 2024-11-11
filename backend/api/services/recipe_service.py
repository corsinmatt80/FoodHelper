import requests
from backend.api.config import API_KEY, BASE_URL

def get_recipe(query):
    """Fetch recipes based on ingredients."""
    url = f"{BASE_URL}/recipes/findByIngredients"
    params = {"ingredients": query, "number": 2, "apiKey": API_KEY}

    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()