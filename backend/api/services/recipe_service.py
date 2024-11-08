import requests


def get_recipe(query):
    base_url = "https://api.spoonacular.com/recipes/findByIngredients"
    query = ",".join(query)
    number = 2 # 2 to minimize missing ingredients
    api_key = ""

    headers = {
        "x-api-key": api_key
    }

    params = {
        "ingredients": query,
        "number": number
    }

    return requests.get(base_url, headers=headers, params=params)
