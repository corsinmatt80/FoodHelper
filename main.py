import requests

base_url = "https://api.spoonacular.com/recipes/findByIngredients"
ingredients = ["apples", "flour", "sugar"]
query = ",".join(ingredients)
number = 2
api_key = "4c161bfe1a274a4b8f44d41892261ee7"

headers = {
    "x-api-key": api_key
}

params = {
    "ingredients": query,
    "number": number
}

response = requests.get(base_url, headers=headers, params=params)
print(response.json())
