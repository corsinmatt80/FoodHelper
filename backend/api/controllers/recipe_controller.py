# backend/api/controllers/recipe_controller.py
from backend.api.services.recipe_service import get_recipe

def fetch_recipe(query):
    try:
        # Ruft das Rezept basierend auf der Suchanfrage ab
        recipes = get_recipe(query)
        return {"status": "success", "data": recipes}, 200  # Erfolgreiche Antwort mit Daten und Statuscode
    except Exception as e:
        # Fehlerbehandlung und Rückgabe einer Fehlermeldung
        return {"status": "error", "message": str(e)}, 500  # Fehlerstatus und Fehlermeldung
