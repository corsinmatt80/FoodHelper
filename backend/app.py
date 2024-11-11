from flask import Flask, request, jsonify
from backend.api.controllers.recipe_controller import fetch_recipe

app = Flask(__name__)

@app.route('/recipe', methods=['GET'])
def get_recipe_route():
    query = request.args.get('query')
    if not query:
        return jsonify({"status": "error", "message": "Query parameter is required"}), 400

    result, status_code = fetch_recipe(query)
    return jsonify(result), status_code

if __name__ == '__main__':
    app.run(debug=True)