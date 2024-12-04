import json
from datetime import timedelta

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from services.recipe_service import RecipeService
from services.text_to_speech_service import TextToSpeechService
from models import User, Recipe
from extensions import db
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///foodhelper.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

jwt = JWTManager(app)
db.init_app(app)

with app.app_context():
    db.create_all()

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


@app.route('/api/textToSpeech', methods=['POST'])
def text_to_speech():
    data = request.get_json()
    text = data.get("text")

    try:
        audio_url = text_to_speech_service.get_audio_url(text)
        return jsonify({"audio_url": audio_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/register', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400
    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        login_user(user)
        access_token = create_access_token(identity=str(user.id))
        return jsonify({'message': 'Logged in successfully',
                        "token" : access_token}), 200
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/save_recipes', methods=['POST'])
@jwt_required()
def save_recipe():
    user_id = get_jwt_identity()
    user_id = int(user_id)
    data = request.get_json()
    recipe_details_str = json.dumps(data)
    new_recipe = Recipe(user_id=user_id, recipe_details=recipe_details_str)
    try:
        db.session.add(new_recipe)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error saving recipe', 'error': str(e)}), 500

    return jsonify({'message': 'Recipe saved successfully'}), 201

@app.route('/get_recipes', methods=['GET'])
@jwt_required()
def get_recipes_for_user():
    user_id = get_jwt_identity()
    recipes = Recipe.query.filter_by(user_id=user_id).all()
    try:
        recipe_list = [json.loads(recipe.recipe_details) for recipe in recipes]
        return jsonify({'recipes': recipe_list}), 200
    except Exception as e:
        return jsonify({'message': 'Error decoding recipe details', 'error': str(e)}), 500




login_manager = LoginManager()
login_manager.init_app(app)


if __name__ == '__main__':
    app.run(debug=True)
