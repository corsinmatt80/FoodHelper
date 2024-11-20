import json
import requests
import time
import os
from dotenv import load_dotenv

load_dotenv()

AUTHORIZATION = os.getenv("EDEN_AI_AUTHORIZATION")

headers = {"Authorization": AUTHORIZATION}

def text_to_speech(text):

    url = "https://api.edenai.run/v2/workflow/dd0ce326-bd8d-40a7-bacb-f323e65513ac/execution/"

    payload = {"text":text,"input_language":"en"}

    response = requests.post(url, json=payload, headers=headers)
    result = json.loads(response.text)

    # Get the result from the response
    execution_id = result["id"]

    while True:
        time.sleep(1)
        url = f"https://api.edenai.run/v2/workflow/dd0ce326-bd8d-40a7-bacb-f323e65513ac/execution/{execution_id}/"

        response2 = requests.get(url, headers=headers)
        result2 = json.loads(response2.text)

        if result2['content']['status'] == "success":
            break

    return result2['content']['results']['audio__text_to_speech']['results'][0]['audio_resource_url']

