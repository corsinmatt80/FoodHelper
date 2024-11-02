from flask import Blueprint, request, jsonify
from backend.api.controllers.recipe_controller import fetch_recipe

recipe_bp = Blueprint('recipe', __name__)

@recipe_bp.route('/recipe', methods=['GET'])
def get_recipe():
    query = request.args.get('query')
    if not query:
        return jsonify({"status": "error", "message": "Query parameter is required"}), 400

    result, status_code = fetch_recipe(query)
    return jsonify(result), status_code
