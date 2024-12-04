from flask import Flask, request, jsonify
from flask_cors import CORS
from services.recipe_service import RecipeService
from services.text_to_speech_service import TextToSpeechService


app = Flask(__name__)
CORS(app)

recipe_service = RecipeService()
text_to_speech_service = TextToSpeechService()

@app.route('/api/recipes', methods=['POST'])
def get_recipes():
    data = request.get_json()
    ingredients = data.get("ingredients")
    diet = data.get("diet")
    intolerances = data.get("intolerances")
    maxCalories = data.get("maxCalories")
    cuisine = data.get("cuisine")
    try:
        recipes = recipe_service.get_recipes(
            ingredients=ingredients,
            diet=diet,
            intolerances=intolerances,
            maxCalories=maxCalories,
            cuisine=cuisine
        )
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


@app.route('/api/textToSpeech', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    text = data.get("text")

    try:
        audio_url = text_to_speech_service.get_audio_url(text)
        return jsonify({"audio_url": audio_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500