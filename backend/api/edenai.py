import json
import requests
import time
import os
from dotenv import load_dotenv
from datetime import datetime
import re

load_dotenv()

AUTHORIZATION = os.getenv("EDEN_AI_AUTHORIZATION")

headers = {"Authorization": AUTHORIZATION}

class EdenAIService:
    def __init__(self):
        self.cache = {}

    def _extract_expiration(self, url):
        match = re.search(r'Expires=(\d+)', url)
        if match:
            return int(match.group(1))
        return None

    def _is_url_expired(self, expiration_timestamp):
        current_timestamp = int(datetime.now().timestamp())
        return current_timestamp >= expiration_timestamp

    def text_to_speech(self, text):
        # Check cache first
        cache_key = text
        if cache_key in self.cache:
            cached_url = self.cache[cache_key]['audioUrl']
            expiration = self.cache[cache_key]['expires']
            
            if not self._is_url_expired(expiration):
                return {'audioUrl': cached_url, 'cached': True}

        # Make API request if not cached or expired
        url = "https://api.edenai.run/v2/workflow/dd0ce326-bd8d-40a7-bacb-f323e65513ac/execution/"
        payload = {"text": text, "input_language": "en"}

        response = requests.post(url, json=payload, headers=headers)
        result = json.loads(response.text)
        execution_id = result["id"]

        while True:
            time.sleep(1)
            url = f"https://api.edenai.run/v2/workflow/dd0ce326-bd8d-40a7-bacb-f323e65513ac/execution/{execution_id}/"
            response2 = requests.get(url, headers=headers)
            result2 = json.loads(response2.text)

            if result2['content']['status'] == "succeeded":
                break

        audio_url = result2['content']['results']['audio__text_to_speech']['results'][0]['audio_resource_url']
        
        # Cache the result with expiration
        expiration = self._extract_expiration(audio_url)
        if expiration:
            self.cache[cache_key] = {
                'audioUrl': audio_url,
                'expires': expiration
            }

        return {'audioUrl': audio_url, 'cached': False}