from flask import jsonify
from backend.api.services.recipe_service import get_recipe_by_id, get_recipe_by_ingredients

def fetch_recipe_by_ingredients(query):
    try:
        recipes = get_recipe_by_ingredients(query)
        return {"status": "success", "data": recipes}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

def fetch_recipe_by_id(recipe_id):
    try:
        recipe = get_recipe_by_id(recipe_id)
        return {"status": "success", "data": recipe}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500