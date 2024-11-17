import requests
from config import API_KEY, BASE_URL

class SpoonacularAPI:
    def fetch_recipes_by_ingredients(self, ingredients):
        url = f"{BASE_URL}/recipes/findByIngredients"
        params = {"ingredients": ingredients, "apiKey": API_KEY}
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    def fetch_recipe_details(self, recipe_id):
        url = f"{BASE_URL}/recipes/{recipe_id}/information"
        params = {"includeNutrition": "true", "apiKey": API_KEY}
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
