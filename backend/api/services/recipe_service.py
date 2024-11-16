import requests
from backend.api.config import API_KEY, BASE_URL

def get_recipe_by_ingredients(query):
    """Fetch recipes based on ingredients."""
    url = f"{BASE_URL}/recipes/findByIngredients"
    params = {"ingredients": query, "number": 5, "apiKey": API_KEY}

    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def get_recipe_by_id(recipe_id):
    """Fetch recipe by ID."""
    url = f"{BASE_URL}/recipes/{recipe_id}/information"
    params = {"includeNutrition" : "true", "apiKey": API_KEY}

    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

