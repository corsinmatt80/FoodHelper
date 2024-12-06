import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")


class SpoonacularAPI:
    def __init__(self):
        self.cache = {}

    def fetch_recipes(self, ingredients=None, diet=None, intolerances=None, maxCalories=None, cuisine=None):
        url = f"{BASE_URL}/recipes/complexSearch"
        params = {
            "apiKey": API_KEY,
            "includeIngredients": ingredients,
            "diet": diet,
            "intolerances": intolerances,
            "maxCalories": maxCalories,
            "cuisine": cuisine,
            "number": 1
        }
        cache_key = (url, frozenset(params.items()))
        if cache_key in self.cache:
            cached_response = self.cache[cache_key]
            cached_response['cached'] = True
            return cached_response

        response = requests.get(url, params=params)
        response.raise_for_status()
        response_json = response.json()
        response_json['cached'] = False
        self.cache[cache_key] = response_json
        return response_json

    def fetch_recipe_details(self, recipe_id):
        url = f"{BASE_URL}/recipes/{recipe_id}/information"
        params = {"includeNutrition": "true", "apiKey": API_KEY}
        cache_key = (url, frozenset(params.items()))
        if cache_key in self.cache:
            cached_response = self.cache[cache_key]
            cached_response['cached'] = True
            return cached_response

        response = requests.get(url, params=params)
        response.raise_for_status()
        response_json = response.json()
        response_json['cached'] = False
        self.cache[cache_key] = response_json
        return response_json

