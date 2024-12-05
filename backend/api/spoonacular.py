import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")


class SpoonacularAPI:
    def fetch_recipes(self, ingredients=None, diet=None, intolerances=None, maxCalories=None, cuisine=None):
        url = f"{BASE_URL}/recipes/complexSearch"
        params = {
            "apiKey": API_KEY,
            "includeIngredients": ingredients,
            "diet": diet,
            "intolerances": intolerances,
            "maxCalories": maxCalories,
            "cuisine": cuisine,
            "number" : 1
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    def fetch_recipe_details(self, recipe_id):
        url = f"{BASE_URL}/recipes/{recipe_id}/information"
        params = {"includeNutrition": "true", "apiKey": API_KEY}
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    
