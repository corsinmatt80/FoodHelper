from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from services.recipe_service import RecipeService
from services.text_to_speech_service import TextToSpeechService
from models import User, Recipe
from extensions import db


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///foodhelper.db'  # or other database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

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
        return jsonify({'message': 'Logged in successfully'}), 200
    return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/recipes', methods=['POST'])
@login_required
def save_recipe():
    data = request.get_json()
    new_recipe = Recipe(user_id=current_user.id, recipe_details=data['details'])
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe saved successfully'}), 201

@app.route('/recipes', methods=['GET'])
@login_required
def get_recipes():
    recipes = Recipe.query.filter_by(user_id=current_user.id).all()
    return jsonify({'recipes': [recipe.recipe_details for recipe in recipes]}), 200

    
@app.before_first_request
def create_tables():
    db.create_all()

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))