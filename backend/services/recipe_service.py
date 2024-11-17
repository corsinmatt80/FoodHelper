from api.spoonacular import SpoonacularAPI

class RecipeService:
    def __init__(self):
        self.api_client = SpoonacularAPI()

    def get_recipes_by_ingredients(self, ingredients):
        return self.api_client.fetch_recipes_by_ingredients(ingredients)

    def get_recipe_details(self, recipe_id):
        return self.api_client.fetch_recipe_details(recipe_id)
