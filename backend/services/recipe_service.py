from api.spoonacular import SpoonacularAPI

class RecipeService:
    def __init__(self):
        self.api_client = SpoonacularAPI()

    def get_recipes(self, ingredients=None, diet=None, intolerances=None, maxCalories=None, cuisine=None):
        return self.api_client.fetch_recipes(
            ingredients=ingredients,
            diet=diet,
            intolerances=intolerances,
            maxCalories=maxCalories,
            cuisine=cuisine
        )

    def get_recipe_details(self, recipe_id):
        return self.api_client.fetch_recipe_details(recipe_id)


