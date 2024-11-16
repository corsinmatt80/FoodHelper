from flask import Flask, request, jsonify, render_template
from backend.api.controllers.recipe_controller import fetch_recipe_by_id, fetch_recipe_by_ingredients
import json
app = Flask(__name__, static_folder='../frontend', template_folder='../frontend/templates')



@app.route('/', methods=['GET'])
def get_recipe_route():
    query = request.args.get('query')
    if not query:
        return render_template('index.html')

    result, status_code = fetch_recipe_by_ingredients(query)
    if status_code == 200:
        return render_template('index.html', recipes=result['data'], query=query)
    else:
        return jsonify(result), status_code



# Route to view a specific recipe by ID
@app.route('/recipe/<recipe_id>', methods=['GET'])
def get_recipe_by_id_route(recipe_id):
    if not recipe_id:
        return jsonify({"status": "error", "message": "Recipe ID is required"}), 400

    result, status_code = fetch_recipe_by_id(recipe_id)
    if status_code == 200:
        return render_template('recipeView.html', recipe=result['data'])
    else:
        return jsonify(result), status_code


if __name__ == '__main__':
    app.run(debug=True)
