from flask import jsonify
from backend.api.services.recipe_service import get_recipe

def fetch_recipe(query):
    try:
        recipes = get_recipe(query)
        return {"status": "success", "data": recipes}, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500