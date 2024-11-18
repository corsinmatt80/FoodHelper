from flask import Flask, request, jsonify
from flask_cors import CORS
from services.recipe_service import RecipeService

app = Flask(__name__)
CORS(app)

recipe_service = RecipeService()

@app.route('/api/recipes', methods=['POST'])
def get_recipes():
    data = request.get_json()
    ingredients = data.get("ingredients", "")
    if not ingredients:
        return jsonify({"error": "Ingredients are required"}), 400
    
    try:
        recipes = recipe_service.get_recipes_by_ingredients(ingredients)
        return jsonify(recipes)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe_details(recipe_id):
    try:
        recipe_details = recipe_service.get_recipe_details(recipe_id)
        return jsonify(recipe_details)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)